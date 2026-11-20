/**
 * MLForge AI - Phase 4: Local CSV Parser & Schema Profiler
 * Pure client-side parsing using Papa Parse and browser File API.
 * Performs strict dataset validation, statistical profiling, and type inference.
 */

import Papa from 'papaparse';

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Check if a cell value should be treated as empty / null / missing
 */
export function isValueMissing(val) {
  if (val === null || val === undefined) return true;
  const str = String(val).trim();
  if (str === '') return true;
  const lower = str.toLowerCase();
  return lower === 'na' || lower === 'n/a' || lower === 'nan' || lower === 'null' || lower === 'none' || lower === '?';
}

/**
 * Infer statistical data type from non-empty string values of a column.
 * Strict, explainable rules:
 * - Boolean: Strictly "true"/"false" or "yes"/"no"
 * - Integer: Standard integers, avoids leading-zero codes and >15 digit identifiers
 * - Float: Floating point decimals, exponential notation
 * - Date: ISO and standard date formats (YYYY-MM-DD, MM/DD/YYYY, etc.)
 * - String: Text, mixed types, or identifiers
 * - Unknown: Completely empty column
 */
export function inferColumnType(values) {
  const nonMissing = values.filter((v) => !isValueMissing(v));
  if (nonMissing.length === 0) return 'Unknown';

  // 1. Check Boolean (strictly boolean string values)
  const isAllBoolean = nonMissing.every((v) => {
    const lower = String(v).trim().toLowerCase();
    return lower === 'true' || lower === 'false' || lower === 'yes' || lower === 'no';
  });
  if (isAllBoolean) return 'Boolean';

  // 2. Check Integer
  // Avoid treating identifiers with leading zeros (e.g. "0123") or long numbers (>15 digits) as pure integers
  const isAllInteger = nonMissing.every((v) => {
    const s = String(v).trim();
    if (!/^-?\d+$/.test(s)) return false;
    // Check leading zeros (e.g., "00123" is an ID or postal code, not a numeric math integer)
    if (s.length > 1 && s.startsWith('0')) return false;
    if (s.length > 2 && s.startsWith('-0')) return false;
    // Prevent 16+ digit identifiers from being treated as standard numbers
    if (s.replace('-', '').length > 15) return false;
    return Number.isSafeInteger(Number(s));
  });
  if (isAllInteger) return 'Integer';

  // 3. Check Float / Decimal
  const isAllFloat = nonMissing.every((v) => {
    const s = String(v).trim();
    // Integer or Float format
    if (!/^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(s)) return false;
    // Check leading zeros before decimal point (except single 0, like "0.75")
    const wholePart = s.split('.')[0].replace('-', '');
    if (wholePart.length > 1 && wholePart.startsWith('0')) return false;
    const num = Number(s);
    return !isNaN(num) && !isNaN(parseFloat(s));
  });
  // Must have at least one float indicator (. or e) across non-missing values
  const hasFloatIndicator = nonMissing.some((v) => {
    const s = String(v).trim();
    return s.includes('.') || /[eE]/.test(s);
  });
  if (isAllFloat && hasFloatIndicator) return 'Float';

  // 4. Check Date
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:?\d{2})?)?$/, // ISO 8601
    /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/, // YYYY/MM/DD or YYYY-MM-DD
    /^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}$/, // MM/DD/YYYY or DD-MM-YYYY
  ];
  const isAllDate = nonMissing.every((v) => {
    const s = String(v).trim();
    if (s.length < 8 || s.length > 35) return false;
    const matchesPattern = datePatterns.some((pattern) => pattern.test(s));
    if (!matchesPattern) return false;
    const timestamp = Date.parse(s);
    if (isNaN(timestamp)) return false;
    const year = new Date(timestamp).getFullYear();
    return year >= 1900 && year <= 2100;
  });
  if (isAllDate) return 'Date';

  // 5. Fallback: String (categorical, identifiers, or free text)
  return 'String';
}

/**
 * Validate parsed raw CSV rows
 * Enforces all requirements: file checks, empty columns, duplicates, inconsistent row lengths, etc.
 */
export function validateCSVStructure(rows, file) {
  // 1. Empty content check
  if (!rows || rows.length === 0) {
    throw new Error('The selected CSV file is empty and contains no readable data.');
  }

  const rawHeaders = rows[0];

  // 2. Header presence
  if (!rawHeaders || rawHeaders.length === 0) {
    throw new Error('Failed to parse column headers. Please ensure the CSV has a valid header row.');
  }

  // 3. Missing or empty column names
  const emptyHeaderIndices = [];
  rawHeaders.forEach((h, idx) => {
    if (h === null || h === undefined || String(h).trim() === '') {
      emptyHeaderIndices.push(idx + 1); // 1-indexed for user readability
    }
  });

  if (emptyHeaderIndices.length > 0) {
    throw new Error(
      `Empty column header detected at column position ${emptyHeaderIndices.join(', ')}. All columns must have valid, non-empty names.`
    );
  }

  // 4. Duplicate column names (do not silently rename)
  const trimmedHeaders = rawHeaders.map((h) => String(h).trim());
  const headerCounts = {};
  trimmedHeaders.forEach((h) => {
    headerCounts[h] = (headerCounts[h] || 0) + 1;
  });

  const duplicateHeaders = Object.keys(headerCounts).filter((h) => headerCounts[h] > 1);
  if (duplicateHeaders.length > 0) {
    const dupDetails = duplicateHeaders
      .map((h) => `"${h}" (${headerCounts[h]} occurrences)`)
      .join(', ');
    throw new Error(
      `Duplicate column names detected: ${dupDetails}. Every column header must be unique.`
    );
  }

  // 5. Check if file contains ONLY headers and no data records
  const dataRows = rows.slice(1);
  if (dataRows.length === 0) {
    throw new Error('The CSV file contains column headers but no data records (0 rows).');
  }

  // 6. Inconsistent row lengths
  const expectedColCount = trimmedHeaders.length;
  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    if (row.length !== expectedColCount) {
      throw new Error(
        `Inconsistent row length detected at data row ${i + 1} (line ${i + 2}): expected ${expectedColCount} columns, but found ${row.length} columns.`
      );
    }
  }

  return {
    headers: trimmedHeaders,
    dataRows,
  };
}

/**
 * Main parse function for File object using Papa Parse
 * @param {File} file - Native HTML5 File object
 * @returns {Promise<Object>} Inferred dataset schema, profiles, and preview
 */
export async function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected. Please select a valid CSV file.'));
      return;
    }

    // 1. File extension validation & explicit Excel/XLSX check
    const fileName = file.name.toLowerCase();
    if (
      fileName.endsWith('.xlsx') || 
      fileName.endsWith('.xls') || 
      (file.type && (file.type.includes('spreadsheet') || file.type.includes('excel') || file.type.includes('openxmlformats')))
    ) {
      reject(
        new Error(
          `Unsupported format: Microsoft Excel file ("${file.name}"). MLForge AI currently supports CSV files only. Please convert your spreadsheet to a comma-separated (.csv) file and re-upload.`
        )
      );
      return;
    }

    if (!fileName.endsWith('.csv')) {
      reject(new Error(`Unsupported file extension for "${file.name}". Only comma-separated (.csv) files are supported.`));
      return;
    }

    // 2. MIME type validation where available
    const allowedMimeTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'text/plain',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
    ];
    if (file.type && !allowedMimeTypes.includes(file.type)) {
      reject(
        new Error(
          `Invalid file MIME type: "${file.type}". Please upload a standard comma-separated text CSV file.`
        )
      );
      return;
    }

    // 3. File size check (empty file)
    if (file.size === 0) {
      reject(new Error('The selected CSV file is empty (0 bytes). Please select a populated dataset.'));
      return;
    }

    // 4. File size upper limit check (50 MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      reject(new Error('The selected file exceeds the 50 MB size limit.'));
      return;
    }

    // 5. Parse file contents with Papa Parse
    Papa.parse(file, {
      header: false,
      skipEmptyLines: 'greedy',
      complete: (results) => {
        try {
          // Check Papa Parse fatal errors
          if (results.errors && results.errors.length > 0) {
            // Find fatal or formatting error if any
            const fatalError = results.errors.find(
              (e) => e.type !== 'FieldMismatch' // FieldMismatch will be explicitly handled in validateCSVStructure
            );
            if (fatalError) {
              reject(
                new Error(
                  `CSV parsing error (Row ${fatalError.row || 'Header'}): ${fatalError.message}`
                )
              );
              return;
            }
          }

          // Validate structure (empty, duplicate headers, inconsistent rows, etc.)
          const { headers, dataRows } = validateCSVStructure(results.data, file);

          const totalRows = dataRows.length;
          const totalColumns = headers.length;

          // Compute duplicate rows reliably using serialized row strings
          const seenRows = new Set();
          let duplicateRowsCount = 0;
          for (let r = 0; r < dataRows.length; r++) {
            const key = JSON.stringify(dataRows[r]);
            if (seenRows.has(key)) {
              duplicateRowsCount++;
            } else {
              seenRows.add(key);
            }
          }

          // Column Inspection & Statistical Profiling
          let totalMissingCells = 0;
          const columnProfiles = headers.map((header, colIdx) => {
            let missingCount = 0;
            const colValues = [];
            const uniqueSet = new Set();

            for (let r = 0; r < totalRows; r++) {
              const val = dataRows[r][colIdx];
              if (isValueMissing(val)) {
                missingCount++;
              } else {
                colValues.push(val);
                uniqueSet.add(String(val).trim());
              }
            }

            totalMissingCells += missingCount;
            const nonMissingCount = totalRows - missingCount;
            const missingPercent = totalRows > 0 ? ((missingCount / totalRows) * 100).toFixed(1) : '0.0';
            const inferredType = inferColumnType(colValues);

            return {
              name: header,
              type: inferredType,
              missingCount,
              nonMissingCount,
              missingPercent: Number(missingPercent),
              uniqueCount: uniqueSet.size,
            };
          });

          // Generate Preview Rows (first 10 data rows mapped by header name)
          const previewRows = dataRows.slice(0, 10).map((row) => {
            const rowObj = {};
            headers.forEach((header, idx) => {
              rowObj[header] = row[idx] !== undefined ? row[idx] : '';
            });
            return rowObj;
          });

          const summary = {
            fileName: file.name,
            fileSize: file.size,
            fileSizeFormatted: formatBytes(file.size),
            lastModified: file.lastModified ? new Date(file.lastModified).toLocaleDateString() : 'N/A',
            totalRows,
            totalColumns,
            totalMissingCells,
            duplicateRowsCount,
            headers,
            columnProfiles,
            previewRows,
          };

          resolve(summary);
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => {
        reject(new Error(`Failed to read or parse CSV file: ${err.message}`));
      },
    });
  });
}
