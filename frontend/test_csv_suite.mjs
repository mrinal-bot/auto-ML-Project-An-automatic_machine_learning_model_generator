import Papa from 'papaparse';
import { 
  validateCSVStructure, 
  inferColumnType, 
  isValueMissing 
} from './src/services/csvParser.js';

// Mock File wrapper for Node testing
function testParseCSVString(csvContent, mockFileMeta = { name: 'test.csv', size: 100, type: 'text/csv' }) {
  return new Promise((resolve, reject) => {
    if (!mockFileMeta.name.toLowerCase().endsWith('.csv')) {
      return reject(new Error('Unsupported file extension. Only comma-separated (.csv) files are supported.'));
    }
    if (mockFileMeta.size === 0 || !csvContent || !csvContent.trim()) {
      return reject(new Error('The selected CSV file is empty (0 bytes). Please select a populated dataset.'));
    }

    Papa.parse(csvContent, {
      header: false,
      skipEmptyLines: 'greedy',
      complete: (results) => {
        try {
          const { headers, dataRows } = validateCSVStructure(results.data, mockFileMeta);
          const totalRows = dataRows.length;
          const totalColumns = headers.length;

          // Duplicate rows
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

          // Column profiles
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

          const previewRows = dataRows.slice(0, 10).map((row) => {
            const rowObj = {};
            headers.forEach((header, idx) => {
              rowObj[header] = row[idx] !== undefined ? row[idx] : '';
            });
            return rowObj;
          });

          resolve({
            fileName: mockFileMeta.name,
            fileSize: mockFileMeta.size,
            totalRows,
            totalColumns,
            totalMissingCells,
            duplicateRowsCount,
            headers,
            columnProfiles,
            previewRows,
          });
        } catch (err) {
          reject(err);
        }
      },
      error: (err) => reject(new Error(`Failed to parse CSV: ${err.message}`)),
    });
  });
}

async function runAllTests() {
  console.log('=================================================================');
  console.log('🧪 MLFORGE AI - PHASE 4 CSV PARSER & VALIDATOR TEST SUITE');
  console.log('=================================================================\n');

  let passed = 0;
  let total = 8;

  // Test 0: XLSX Unsupported Format Rejection
  try {
    await testParseCSVString('PK\x03\x04fake_excel_bytes', { name: 'Untitled spreadsheet(1).xlsx', size: 1024, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    console.error('❌ TEST 0 FAILED: Should have rejected XLSX file!');
  } catch (e) {
    console.log('✅ TEST 0: XLSX Unsupported Format (Properly Caught)');
    console.log(`   Caught Error: "${e.message}"`);
    if (e.message.includes('Unsupported file extension') || e.message.includes('supported')) {
      passed++;
    }
  }

  // Test 1: Valid classification CSV
  try {
    const csv1 = `customer_id,age,account_balance,active_member,churn
C-1001,34,54000.50,true,0
C-1002,42,120500.00,false,1
C-1003,28,32100.25,true,0
C-1004,51,89400.75,true,0
C-1005,39,15000.00,false,1`;

    const res1 = await testParseCSVString(csv1, { name: 'customer_churn.csv', size: csv1.length, type: 'text/csv' });
    console.log('✅ TEST 1: Valid Classification CSV');
    console.log(`   Rows: ${res1.totalRows}, Cols: ${res1.totalColumns}, Missing Cells: ${res1.totalMissingCells}, Dups: ${res1.duplicateRowsCount}`);
    console.log(`   Columns Inferred: ${res1.columnProfiles.map(c => `${c.name} [${c.type}]`).join(', ')}`);
    if (res1.totalRows === 5 && res1.totalColumns === 5 && res1.columnProfiles[1].type === 'Integer' && res1.columnProfiles[2].type === 'Float' && res1.columnProfiles[3].type === 'Boolean') {
      passed++;
    } else {
      console.error('   ❌ Mismatch in expected types or counts');
    }
  } catch (e) {
    console.error('   ❌ TEST 1 FAILED:', e.message);
  }

  // Test 2: Valid regression CSV
  try {
    const csv2 = `house_id,square_feet,bedrooms,bathrooms,year_built,sale_price
H-01,1850,3,2.0,1998,345000.00
H-02,2400,4,3.5,2015,520000.00
H-03,1200,2,1.0,1985,215000.50
H-04,3100,5,4.0,2021,780000.00`;

    const res2 = await testParseCSVString(csv2, { name: 'housing_prices.csv', size: csv2.length, type: 'text/csv' });
    console.log('\n✅ TEST 2: Valid Regression CSV');
    console.log(`   Rows: ${res2.totalRows}, Cols: ${res2.totalColumns}, Target: sale_price [${res2.columnProfiles[5].type}]`);
    console.log(`   Columns Inferred: ${res2.columnProfiles.map(c => `${c.name} [${c.type}]`).join(', ')}`);
    if (res2.totalRows === 4 && res2.totalColumns === 6 && res2.columnProfiles[5].type === 'Float') {
      passed++;
    } else {
      console.error('   ❌ Mismatch in expected types');
    }
  } catch (e) {
    console.error('   ❌ TEST 2 FAILED:', e.message);
  }

  // Test 3: CSV containing missing values
  try {
    const csv3 = `employee_id,name,department,tenure_years,performance_score
E-101,Alice,Engineering,4,4.5
E-102,Bob,,2,
E-103,,Sales,NA,3.8
E-104,David,Marketing,,4.1
E-105,Eve,Engineering,5,null`;

    const res3 = await testParseCSVString(csv3, { name: 'employees_missing.csv', size: csv3.length, type: 'text/csv' });
    console.log('\n✅ TEST 3: CSV with Missing Values');
    console.log(`   Rows: ${res3.totalRows}, Cols: ${res3.totalColumns}, Total Missing Cells: ${res3.totalMissingCells}`);
    res3.columnProfiles.forEach(c => {
      console.log(`   - ${c.name}: ${c.missingCount} missing (${c.missingPercent}%), ${c.nonMissingCount} non-missing, ${c.uniqueCount} unique [${c.type}]`);
    });
    if (res3.totalMissingCells === 6) {
      passed++;
    } else {
      console.error(`   ❌ Expected 6 total missing cells, got ${res3.totalMissingCells}`);
    }
  } catch (e) {
    console.error('   ❌ TEST 3 FAILED:', e.message);
  }

  // Test 4: CSV with duplicate column names
  try {
    const csv4 = `patient_id,blood_pressure,age,blood_pressure,outcome
P-01,120,45,125,0
P-02,135,52,130,1`;

    await testParseCSVString(csv4, { name: 'duplicate_cols.csv', size: csv4.length, type: 'text/csv' });
    console.error('\n❌ TEST 4 FAILED: Should have rejected duplicate column names!');
  } catch (e) {
    console.log('\n✅ TEST 4: CSV with Duplicate Column Names (Properly Caught)');
    console.log(`   Caught Error: "${e.message}"`);
    if (e.message.includes('Duplicate column names detected') && e.message.includes('blood_pressure')) {
      passed++;
    }
  }

  // Test 5: Empty CSV
  try {
    const csv5 = ``;
    await testParseCSVString(csv5, { name: 'empty_file.csv', size: 0, type: 'text/csv' });
    console.error('\n❌ TEST 5 FAILED: Should have rejected empty CSV!');
  } catch (e) {
    console.log('\n✅ TEST 5: Empty CSV (Properly Caught)');
    console.log(`   Caught Error: "${e.message}"`);
    if (e.message.includes('empty')) {
      passed++;
    }
  }

  // Test 6: Inconsistent row lengths
  try {
    const csv6 = `col1,col2,col3,col4
val1,val2,val3,val4
val5,val6,val7
val8,val9,val10,val11`;

    await testParseCSVString(csv6, { name: 'inconsistent_rows.csv', size: csv6.length, type: 'text/csv' });
    console.error('\n❌ TEST 6 FAILED: Should have rejected inconsistent row lengths!');
  } catch (e) {
    console.log('\n✅ TEST 6: Inconsistent Row Lengths (Properly Caught)');
    console.log(`   Caught Error: "${e.message}"`);
    if (e.message.includes('Inconsistent row length detected')) {
      passed++;
    }
  }

  // Test 7: Replacing/removing file and uploading another CSV
  try {
    const initialCsv = `id,featureA,featureB\n1,10,20\n2,15,25`;
    const resA = await testParseCSVString(initialCsv, { name: 'datasetA.csv', size: initialCsv.length, type: 'text/csv' });
    
    // Simulate replacement with another dataset
    const secondCsv = `ticker,date,open,close,volume
AAPL,2023-01-03,130.28,125.07,112117500
MSFT,2023-01-03,239.98,239.58,25740000
GOOG,2023-01-03,89.83,89.70,28131200`;
    const resB = await testParseCSVString(secondCsv, { name: 'datasetB.csv', size: secondCsv.length, type: 'text/csv' });

    console.log('\n✅ TEST 7: Dataset Replacement & Recalculation');
    console.log(`   Dataset A: ${resA.fileName} (${resA.totalRows} rows, ${resA.totalColumns} cols)`);
    console.log(`   Dataset B: ${resB.fileName} (${resB.totalRows} rows, ${resB.totalColumns} cols, cols: ${resB.headers.join(', ')})`);
    if (resA.fileName === 'datasetA.csv' && resB.fileName === 'datasetB.csv' && resB.headers.includes('ticker') && !resB.headers.includes('featureA')) {
      passed++;
    }
  } catch (e) {
    console.error('   ❌ TEST 7 FAILED:', e.message);
  }

  console.log('\n=================================================================');
  console.log(`🏁 TEST RESULTS: ${passed} / ${total} TESTS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('=================================================================');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAllTests();
