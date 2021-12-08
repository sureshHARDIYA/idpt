"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _permissions = _interopRequireDefault(require("security/permissions"));

var _i18n = require("i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var permissions = _permissions["default"].values;
var patientsRoutes = [{
  path: '/',
  icon: 'home',
  label: (0, _i18n.i18n)('home.menu'),
  menu: {
    exact: true
  },
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/PatientViewPage'));
    });
  },
  permissionRequired: null,
  exact: true
}, {
  path: '/patient',
  icon: 'profile',
  label: (0, _i18n.i18n)('home.menu'),
  menu: {
    exact: true
  },
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/PatientViewPage'));
    });
  },
  permissionRequired: null,
  exact: true
}, {
  path: '/program',
  icon: 'home',
  label: (0, _i18n.i18n)('home.menu'),
  menu: {
    exact: true
  },
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/PatientViewPage'));
    });
  },
  permissionRequired: null,
  exact: true
}, {
  path: '/record',
  icon: 'home',
  label: (0, _i18n.i18n)('home.menu'),
  menu: {
    exact: true
  },
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/PatientViewPage'));
    });
  },
  permissionRequired: null,
  exact: true
}, {
  path: '/program/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/ModuleListView'));
    });
  },
  menu: false,
  exact: true
}, {
  path: '/program/:id/module/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/TaskListView'));
    });
  },
  menu: false,
  exact: true
}, {
  path: '/profile',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/ProfileFormPage'));
    });
  },
  permissionRequired: null,
  exact: true,
  menu: false
}];
var privateRoutes = [{
  path: '/',
  icon: 'home',
  label: (0, _i18n.i18n)('home.menu'),
  menu: {
    exact: true
  },
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/home/HomePage'));
    });
  },
  permissionRequired: null,
  exact: true
}, {
  path: '/profile',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/ProfileFormPage'));
    });
  },
  permissionRequired: null,
  exact: true,
  menu: false
}, {
  path: '/iam',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/iam/list/IamPage'));
    });
  },
  permissionRequired: permissions.iamRead,
  exact: true,
  icon: 'user-add',
  label: (0, _i18n.i18n)('iam.menu'),
  menu: true
}, {
  path: '/iam/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/iam/new/IamNewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.iamCreate,
  exact: true
}, {
  path: '/iam/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/iam/importer/IamImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.iamImport,
  exact: true
}, {
  path: '/iam/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/iam/edit/IamEditPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.iamEdit,
  exact: true
}, {
  path: '/iam/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/iam/view/IamViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.iamRead,
  exact: true
}, {
  path: '/patient',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/list/PatientListPage'));
    });
  },
  permissionRequired: permissions.patientRead,
  exact: true,
  icon: 'usergroup-add',
  label: (0, _i18n.i18n)('entities.patient.menu'),
  menu: true
}, {
  path: '/patient/responses',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/assignmentResponse/list/AssignmentResponseListPage'));
    });
  },
  permissionRequired: permissions.patientRead,
  exact: true,
  icon: 'usergroup-add',
  label: (0, _i18n.i18n)('entities.assignmentResponse.menu'),
  menu: true
}, {
  path: '/patient/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/form/PatientFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientCreate,
  exact: true
}, {
  path: '/patient/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/importer/PatientImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientImport,
  exact: true
}, {
  path: '/patient/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/form/PatientFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientEdit,
  exact: true
}, {
  path: '/patient/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/PatientViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientRead,
  exact: true
}, {
  path: '/patient/:id/module/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/ModuleListView'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientRead,
  exact: true
}, {
  path: '/cased',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/cased/list/CasedListPage'));
    });
  },
  permissionRequired: permissions.casedRead,
  exact: true,
  icon: 'book',
  label: (0, _i18n.i18n)('entities.cased.menu'),
  menu: true
}, {
  path: '/cased/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/cased/form/CasedFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.casedCreate,
  exact: true
}, {
  path: '/cased/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/cased/importer/CasedImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.casedImport,
  exact: true
}, {
  path: '/cased/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/cased/form/CasedFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.casedEdit,
  exact: true
}, {
  path: '/cased/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/cased/view/CasedViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.casedRead,
  exact: true
}, {
  path: '/module',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/module/list/ModuleListPage'));
    });
  },
  permissionRequired: permissions.moduleRead,
  exact: true,
  icon: 'container',
  label: (0, _i18n.i18n)('entities.module.menu'),
  menu: true
}, {
  path: '/module/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/module/form/ModuleFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.moduleCreate,
  exact: true
}, {
  path: '/module/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/module/importer/ModuleImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.moduleImport,
  exact: true
}, {
  path: '/module/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/module/form/ModuleFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.moduleEdit,
  exact: true
}, {
  path: '/module/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/module/view/ModuleViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.moduleRead,
  exact: true
}, {
  path: '/task',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/task/list/TaskListPage'));
    });
  },
  permissionRequired: permissions.taskRead,
  exact: true,
  icon: 'carry-out',
  label: (0, _i18n.i18n)('entities.task.menu'),
  menu: true
}, {
  path: '/task/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/task/form/TaskFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taskCreate,
  exact: true
}, {
  path: '/task/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/task/importer/TaskImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taskImport,
  exact: true
}, {
  path: '/task/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/task/form/TaskFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taskEdit,
  exact: true
}, {
  path: '/task/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/task/view/TaskViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taskRead,
  exact: true
}, {
  path: '/empatica',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/list/EmpaticaListPage'));
    });
  },
  permissionRequired: permissions.empaticaRead,
  exact: true,
  icon: 'carry-out',
  label: (0, _i18n.i18n)('entities.empatica.menu'),
  menu: true
}, {
  path: '/empatica/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/form/EmpaticaFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.empaticaCreate,
  exact: true
}, {
  path: '/empatica/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/importer/EmpaticaImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.empaticaImport,
  exact: true
}, {
  path: '/empatica/csvImporter',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/csvImporter/EmpaticaCsvImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.empaticaImport,
  exact: true
}, {
  path: '/empatica/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/form/EmpaticaFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.empaticaEdit,
  exact: true
}, {
  path: '/empatica/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/empatica/view/EmpaticaViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.empaticaRead,
  exact: true
}, {
  path: '/record',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/list/RecordListPage'));
    });
  },
  permissionRequired: permissions.recordRead,
  exact: true,
  icon: 'profile',
  label: (0, _i18n.i18n)('entities.record.menu'),
  menu: true
}, {
  path: '/assignments',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/assignments/list/AssignmentsListPage'));
    });
  },
  menu: true,
  icon: 'solution',
  label: (0, _i18n.i18n)('entities.assignments.menu'),
  permissionRequired: permissions.casedRead,
  exact: true
}, {
  path: '/assignments/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/assignments/form/AssignmentFormPage'));
    });
  },
  menu: false,
  label: (0, _i18n.i18n)('entities.assignments.menu'),
  permissionRequired: permissions.recordRead,
  exact: true
}, {
  path: '/assignments/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/assignments/form/AssignmentFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taskEdit,
  exact: true
}, {
  path: '/record/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/form/RecordFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.recordCreate,
  exact: true
}, {
  path: '/record/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/importer/RecordImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.recordImport,
  exact: true
}, {
  path: '/roadmaps/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/roadmap/RecordRoadmapViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.recordRead,
  exact: true
}, {
  path: '/epics/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/epic/RecordEpicViewPage'));
    });
  },
  menu: false,
  exact: true,
  permissionRequired: permissions.recordRead
}, {
  path: '/taxonomy',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/taxonomy/list/TaxonomyListPage'));
    });
  },
  permissionRequired: permissions.taxonomyRead,
  exact: true,
  icon: 'apartment',
  label: (0, _i18n.i18n)('entities.taxonomy.menu'),
  menu: true
}, {
  path: '/taxonomy/new',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/taxonomy/form/TaxonomyFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taxonomyCreate,
  exact: true
}, {
  path: '/taxonomy/importer',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/taxonomy/importer/TaxonomyImporterPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taxonomyImport,
  exact: true
}, {
  path: '/taxonomy/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/taxonomy/form/TaxonomyFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taxonomyEdit,
  exact: true
}, {
  path: '/taxonomy/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/taxonomy/view/TaxonomyViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.taxonomyRead,
  exact: true
}, {
  path: '/settings',
  icon: 'setting',
  label: (0, _i18n.i18n)('settings.menu'),
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/settings/SettingsFormPage'));
    });
  },
  permissionRequired: permissions.settingsEdit,
  menu: true
}, {
  path: '/record/:id/edit',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/form/RecordFormPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.recordEdit,
  exact: true
}, {
  path: '/record/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/record/view/RecordViewPage'));
    });
  },
  menu: false,
  permissionRequired: permissions.recordRead,
  exact: true
}, // For patient view
{
  path: '/program/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/ModuleListView'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientRead,
  exact: true
}, {
  path: '/program/:id/module/:id',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/patient/view/TaskListView'));
    });
  },
  menu: false,
  permissionRequired: permissions.patientRead,
  exact: true
}, {
  path: '/audit-logs',
  icon: 'file-search',
  label: (0, _i18n.i18n)('auditLog.menu'),
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auditLog/AuditLogPage'));
    });
  },
  menu: true,
  permissionRequired: permissions.auditLogRead
}];
var publicRoutes = [{
  path: '/auth/signin',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/SigninPage'));
    });
  }
}, {
  path: '/auth/signup',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/SignupPage'));
    });
  }
}, {
  path: '/auth/forgot-password',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/ForgotPasswordPage'));
    });
  }
}];
var emptyPermissionsRoutes = [{
  path: '/auth/empty-permissions',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/EmptyPermissionsPage'));
    });
  }
}];
var emailUnverifiedRoutes = [{
  path: '/auth/email-unverified',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/EmailUnverifiedPage'));
    });
  }
}];
var simpleRoutes = [{
  path: '/auth/password-reset',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/PasswordResetPage'));
    });
  }
}, {
  path: '/auth/verify-email',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/auth/VerifyEmailPage'));
    });
  }
}, {
  path: '/403',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/shared/errors/Error403Page'));
    });
  }
}, {
  path: '/500',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/shared/errors/Error500Page'));
    });
  }
}, {
  path: '**',
  loader: function loader() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('view/shared/errors/Error404Page'));
    });
  }
}];
var _default = {
  privateRoutes: privateRoutes,
  publicRoutes: publicRoutes,
  emptyPermissionsRoutes: emptyPermissionsRoutes,
  emailUnverifiedRoutes: emailUnverifiedRoutes,
  simpleRoutes: simpleRoutes,
  patientsRoutes: patientsRoutes
};
exports["default"] = _default;