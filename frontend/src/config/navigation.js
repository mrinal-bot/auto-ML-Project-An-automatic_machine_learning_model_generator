/**
 * MLForge AI - Centralized Navigation Configuration
 * Defines all sidebar navigation items, groups, paths, and icons.
 * Modifying navigation structure here updates all components automatically.
 */

export const navigationConfig = {
  groups: [
    {
      id: 'main',
      title: 'Main',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          path: '/dashboard',
          iconName: 'LayoutDashboard',
          exact: true,
        },
        {
          id: 'projects',
          label: 'My Projects',
          path: '/dashboard/projects',
          iconName: 'FolderGit2',
        },
        {
          id: 'create-project',
          label: 'Create New Project',
          path: '/dashboard/create-project',
          iconName: 'PlusCircle',
        },
      ],
    },
    {
      id: 'workspace',
      title: 'Workspace',
      items: [
        {
          id: 'datasets',
          label: 'Dataset Library',
          path: '/dashboard/datasets',
          iconName: 'Database',
        },
        {
          id: 'results',
          label: 'Model Results',
          path: '/dashboard/results',
          iconName: 'BrainCircuit',
        },
        {
          id: 'reports',
          label: 'Reports',
          path: '/dashboard/reports',
          iconName: 'FileText',
        },
      ],
    },
    {
      id: 'other',
      title: 'Other',
      items: [
        {
          id: 'documentation',
          label: 'Documentation',
          path: '#docs',
          iconName: 'BookOpen',
          isExternal: true,
        },
        {
          id: 'settings',
          label: 'Settings',
          path: '/dashboard/settings',
          iconName: 'Settings',
        },
        {
          id: 'support',
          label: 'Help & Support',
          path: '#support',
          iconName: 'HelpCircle',
          isExternal: true,
        },
      ],
    },
  ],
};

/**
 * Route metadata mapping for breadcrumb generation and dynamic topbar headers
 */
export const routeMeta = {
  '/dashboard': { section: 'Main', title: 'Dashboard Overview' },
  '/dashboard/projects': { section: 'Main', title: 'My Projects' },
  '/dashboard/create-project': { section: 'Main', title: 'Create New Project' },
  '/dashboard/datasets': { section: 'Workspace', title: 'Dataset Library' },
  '/dashboard/results': { section: 'Workspace', title: 'Model Results' },
  '/dashboard/reports': { section: 'Workspace', title: 'Reports' },
  '/dashboard/settings': { section: 'Other', title: 'Account Settings' },
};

export function getRouteMeta(pathname) {
  return routeMeta[pathname] || { section: 'Dashboard', title: 'Workspace' };
}

