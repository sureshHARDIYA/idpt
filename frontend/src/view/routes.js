import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

const patientsRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () =>
      import('view/patient/view/PatientViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/patient',
    icon: 'profile',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () =>
      import('view/patient/view/PatientViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/program',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () =>
      import('view/patient/view/PatientViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/record',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () =>
      import('view/patient/view/PatientViewPage'),
    permissionRequired: null,
    exact: true,
  },
  {
    path: '/program/:id',
    loader: () =>
      import('view/patient/view/ModuleListView'),
    menu: false,
    exact: true,
  },
  {
    path: '/program/:id/module/:id',
    loader: () => import('view/patient/view/TaskListView'),
    menu: false,
    exact: true,
  },
];

const privateRoutes = [
  {
    path: '/',
    icon: 'home',
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: 'user-add',
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: 'file-search',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/patient',
    loader: () =>
      import('view/patient/list/PatientListPage'),
    permissionRequired: permissions.patientRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.patient.menu'),
    menu: true,
  },
  {
    path: '/patient/new',
    loader: () =>
      import('view/patient/form/PatientFormPage'),
    menu: false,
    permissionRequired: permissions.patientCreate,
    exact: true,
  },
  {
    path: '/patient/importer',
    loader: () =>
      import('view/patient/importer/PatientImporterPage'),
    menu: false,
    permissionRequired: permissions.patientImport,
    exact: true,
  },
  {
    path: '/patient/:id/edit',
    loader: () =>
      import('view/patient/form/PatientFormPage'),
    menu: false,
    permissionRequired: permissions.patientEdit,
    exact: true,
  },
  {
    path: '/patient/:id',
    loader: () =>
      import('view/patient/view/PatientViewPage'),
    menu: false,
    permissionRequired: permissions.patientRead,
    exact: true,
  },
  {
    path: '/patient/:id/module/:id',
    loader: () =>
      import('view/patient/view/ModuleListView'),
    menu: false,
    permissionRequired: permissions.patientRead,
    exact: true,
  },
  {
    path: '/cased',
    loader: () => import('view/cased/list/CasedListPage'),
    permissionRequired: permissions.casedRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.cased.menu'),
    menu: true,
  },
  {
    path: '/cased/new',
    loader: () => import('view/cased/form/CasedFormPage'),
    menu: false,
    permissionRequired: permissions.casedCreate,
    exact: true,
  },
  {
    path: '/cased/importer',
    loader: () =>
      import('view/cased/importer/CasedImporterPage'),
    menu: false,
    permissionRequired: permissions.casedImport,
    exact: true,
  },
  {
    path: '/cased/:id/edit',
    loader: () => import('view/cased/form/CasedFormPage'),
    menu: false,
    permissionRequired: permissions.casedEdit,
    exact: true,
  },
  {
    path: '/cased/:id',
    loader: () => import('view/cased/view/CasedViewPage'),
    menu: false,
    permissionRequired: permissions.casedRead,
    exact: true,
  },

  {
    path: '/module',
    loader: () => import('view/module/list/ModuleListPage'),
    permissionRequired: permissions.moduleRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.module.menu'),
    menu: true,
  },
  {
    path: '/module/new',
    loader: () => import('view/module/form/ModuleFormPage'),
    menu: false,
    permissionRequired: permissions.moduleCreate,
    exact: true,
  },
  {
    path: '/module/importer',
    loader: () =>
      import('view/module/importer/ModuleImporterPage'),
    menu: false,
    permissionRequired: permissions.moduleImport,
    exact: true,
  },
  {
    path: '/module/:id/edit',
    loader: () => import('view/module/form/ModuleFormPage'),
    menu: false,
    permissionRequired: permissions.moduleEdit,
    exact: true,
  },
  {
    path: '/module/:id',
    loader: () => import('view/module/view/ModuleViewPage'),
    menu: false,
    permissionRequired: permissions.moduleRead,
    exact: true,
  },

  {
    path: '/task',
    loader: () => import('view/task/list/TaskListPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.task.menu'),
    menu: true,
  },
  {
    path: '/task/new',
    loader: () => import('view/task/form/TaskFormPage'),
    menu: false,
    permissionRequired: permissions.taskCreate,
    exact: true,
  },
  {
    path: '/task/importer',
    loader: () =>
      import('view/task/importer/TaskImporterPage'),
    menu: false,
    permissionRequired: permissions.taskImport,
    exact: true,
  },
  {
    path: '/task/:id/edit',
    loader: () => import('view/task/form/TaskFormPage'),
    menu: false,
    permissionRequired: permissions.taskEdit,
    exact: true,
  },
  {
    path: '/task/:id',
    loader: () => import('view/task/view/TaskViewPage'),
    menu: false,
    permissionRequired: permissions.taskRead,
    exact: true,
  },
  {
    path: '/record',
    loader: () => import('view/record/list/RecordListPage'),
    permissionRequired: permissions.recordRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.record.menu'),
    menu: true,
  },
  {
    path: '/assignments',
    loader: () =>
      import('view/assignments/list/AssignmentsListPage'),
    menu: true,
    icon: 'right',
    label: i18n('entities.assignments.menu'),
    permissionRequired: permissions.casedRead,
    exact: true,
  },
  {
    path: '/assignments/new',
    loader: () =>
      import('view/assignments/form/AssignmentFormPage'),
    menu: false,
    label: i18n('entities.assignments.menu'),
    permissionRequired: permissions.recordRead,
    exact: true,
  },
  {
    path: '/assignments/:id/edit',
    loader: () =>
      import('view/assignments/form/AssignmentFormPage'),
    menu: false,
    permissionRequired: permissions.taskEdit,
    exact: true,
  },
  {
    path: '/record/new',
    loader: () => import('view/record/form/RecordFormPage'),
    menu: false,
    permissionRequired: permissions.recordCreate,
    exact: true,
  },
  {
    path: '/record/importer',
    loader: () =>
      import('view/record/importer/RecordImporterPage'),
    menu: false,
    permissionRequired: permissions.recordImport,
    exact: true,
  },
  {
    path: '/roadmaps/:id',
    loader: () =>
      import('view/record/roadmap/RecordRoadmapViewPage'),
    menu: false,
    permissionRequired: permissions.recordRead,
    exact: true,
  },
  {
    path: '/epics/:id',
    loader: () =>
      import('view/record/epic/RecordEpicViewPage'),
    menu: false,
    exact: true,
    permissionRequired: permissions.recordRead,
  },
  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },
  {
    path: '/record/:id/edit',
    loader: () => import('view/record/form/RecordFormPage'),
    menu: false,
    permissionRequired: permissions.recordEdit,
    exact: true,
  },
  {
    path: '/record/:id',
    loader: () => import('view/record/view/RecordViewPage'),
    menu: false,
    permissionRequired: permissions.recordRead,
    exact: true,
  },
  // For patient view
  {
    path: '/program/:id',
    loader: () =>
      import('view/patient/view/ModuleListView'),
    menu: false,
    permissionRequired: permissions.patientRead,
    exact: true,
  },
  {
    path: '/program/:id/module/:id',
    loader: () => import('view/patient/view/TaskListView'),
    menu: false,
    permissionRequired: permissions.patientRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
  patientsRoutes,
};
