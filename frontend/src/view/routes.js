import Permissions from 'security/permissions';
import { i18n } from 'i18n';
const permissions = Permissions.values;

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
    path: '/cased',
    loader: () => import('view/cased/list/CasedListPage'),
    permissionRequired: permissions.casedRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.cased.menu'),
    menu: true,
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
    path: '/task',
    loader: () => import('view/task/list/TaskListPage'),
    permissionRequired: permissions.taskRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.task.menu'),
    menu: true,
  },
  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
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
    path: '/cased/new',
    loader: () => import('view/cased/form/CasedFormPage'),
    menu: false,
    permissionRequired: permissions.casedCreate,
    exact: true,
    submenu: true,
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
    path: '/audio',
    loader: () => import('view/audio/list/AudioListPage'),
    permissionRequired: permissions.audioRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.audio.menu'),
    menu: true,
  },
  {
    path: '/audio/new',
    loader: () => import('view/audio/form/AudioFormPage'),
    menu: false,
    permissionRequired: permissions.audioCreate,
    exact: true,
  },
  {
    path: '/audio/importer',
    loader: () =>
      import('view/audio/importer/AudioImporterPage'),
    menu: false,
    permissionRequired: permissions.audioImport,
    exact: true,
  },
  {
    path: '/audio/:id/edit',
    loader: () => import('view/audio/form/AudioFormPage'),
    menu: false,
    permissionRequired: permissions.audioEdit,
    exact: true,
  },
  {
    path: '/audio/:id',
    loader: () => import('view/audio/view/AudioViewPage'),
    menu: false,
    permissionRequired: permissions.audioRead,
    exact: true,
  },

  {
    path: '/video',
    loader: () => import('view/video/list/VideoListPage'),
    permissionRequired: permissions.audioRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.video.menu'),
    menu: true,
  },

  {
    path: '/video/new',
    loader: () => import('view/video/form/VideoFormPage'),
    menu: false,
    permissionRequired: permissions.audioCreate,
    exact: true,
  },
  {
    path: '/video/importer',
    loader: () =>
      import('view/video/importer/VideoImporterPage'),
    menu: false,
    permissionRequired: permissions.videoImport,
    exact: true,
  },
  {
    path: '/video/:id/edit',
    loader: () => import('view/video/form/VideoFormPage'),
    menu: false,
    permissionRequired: permissions.videoEdit,
    exact: true,
  },
  {
    path: '/video/:id',
    loader: () => import('view/video/view/VideoViewPage'),
    menu: false,
    permissionRequired: permissions.videoRead,
    exact: true,
  },

  {
    path: '/document',
    loader: () => import('view/document/list/DocumentListPage'),
    permissionRequired: permissions.documentRead,
    exact: true,
    icon: 'right',
    label: i18n('entities.document.menu'),
    menu: true,
  },
  {
    path: '/document/new',
    loader: () => import('view/document/form/DocumentFormPage'),
    menu: false,
    permissionRequired: permissions.documentCreate,
    exact: true,
  },
  {
    path: '/document/importer',
    loader: () =>
      import('view/document/importer/DocumentImporterPage'),
    menu: false,
    permissionRequired: permissions.documentImport,
    exact: true,
  },
  {
    path: '/document/:id/edit',
    loader: () => import('view/document/form/DocumentFormPage'),
    menu: false,
    permissionRequired: permissions.documentEdit,
    exact: true,
  },
  {
    path: '/document/:id',
    loader: () => import('view/document/view/DocumentViewPage'),
    menu: false,
    permissionRequired: permissions.documentRead,
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
    loader: () => import('view/record/roadmap/RecordRoadmapViewPage'),
    menu: false,
    permissionRequired: permissions.recordRead,
    exact: true,
  },
  {
    path: '/epics/:id',
    loader: () => import('view/record/epic/RecordEpicViewPage'),
    menu: false,
    exact: true,
    permissionRequired: permissions.recordRead,
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
    path: '/audit-logs',
    icon: 'file-search',
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: 'setting',
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
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
};
