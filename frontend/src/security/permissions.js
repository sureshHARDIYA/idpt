import Roles from 'security/roles';
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
          roles.viewer,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [
          roles.owner,
          roles.auditLogViewer,
          roles.viewer,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      patientImport: {
        id: 'patientImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.patientEditor,
        ],
      },
      patientCreate: {
        id: 'patientCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.patientEditor,
        ],
        allowedStorageFolders: ['patient'],
      },
      patientEdit: {
        id: 'patientEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.patientEditor,
        ],
        allowedStorageFolders: ['patient'],
      },
      patientDestroy: {
        id: 'patientDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.patientEditor,
        ],
        allowedStorageFolders: ['patient'],
      },
      patientRead: {
        id: 'patientRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.patientEditor,
          roles.patient,
        ],
      },
      patientAutocomplete: {
        id: 'patientAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.patientEditor,
          roles.patient,
          roles.casedEditor,
          roles.casedViewer,
        ],
      },

      casedImport: {
        id: 'casedImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.casedEditor,
        ],
      },
      casedCreate: {
        id: 'casedCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.casedEditor,
        ],
        allowedStorageFolders: ['cased'],
      },
      casedEdit: {
        id: 'casedEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.casedEditor,
        ],
        allowedStorageFolders: ['cased'],
      },
      casedDestroy: {
        id: 'casedDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.casedEditor,
        ],
        allowedStorageFolders: ['cased'],
      },
      casedRead: {
        id: 'casedRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.casedEditor,
          roles.casedViewer,
        ],
      },
      casedAutocomplete: {
        id: 'casedAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.casedEditor,
          roles.casedViewer,
          roles.patientEditor,
          roles.patient,
          roles.moduleEditor,
          roles.moduleViewer,
        ],
      },

      moduleImport: {
        id: 'moduleImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.moduleEditor,
        ],
      },
      moduleCreate: {
        id: 'moduleCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.moduleEditor,
        ],
        allowedStorageFolders: ['module'],
      },
      moduleEdit: {
        id: 'moduleEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.moduleEditor,
        ],
        allowedStorageFolders: ['module'],
      },
      moduleDestroy: {
        id: 'moduleDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.moduleEditor,
        ],
        allowedStorageFolders: ['module'],
      },
      moduleRead: {
        id: 'moduleRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.moduleEditor,
          roles.moduleViewer,
        ],
      },
      moduleAutocomplete: {
        id: 'moduleAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.moduleEditor,
          roles.moduleViewer,
          roles.casedEditor,
          roles.casedViewer,
          roles.taskEditor,
          roles.taskViewer,
        ],
      },

      taskImport: {
        id: 'taskImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taskEditor,
        ],
      },
      taskCreate: {
        id: 'taskCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taskEditor,
        ],
        allowedStorageFolders: ['task'],
      },
      taskEdit: {
        id: 'taskEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taskEditor,
        ],
        allowedStorageFolders: ['task'],
      },
      taskDestroy: {
        id: 'taskDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taskEditor,
        ],
        allowedStorageFolders: ['task'],
      },
      taskRead: {
        id: 'taskRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.taskEditor,
          roles.taskViewer,
        ],
      },
      taskAutocomplete: {
        id: 'taskAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.taskEditor,
          roles.taskViewer,
          roles.moduleEditor,
          roles.moduleViewer,
        ],
      },

      audioImport: {
        id: 'audioImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.audioEditor,
        ],
      },
      audioCreate: {
        id: 'audioCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.audioEditor,
        ],
        allowedStorageFolders: ['audio'],
      },
      audioEdit: {
        id: 'audioEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.audioEditor,
        ],
        allowedStorageFolders: ['audio'],
      },
      audioDestroy: {
        id: 'audioDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.audioEditor,
        ],
        allowedStorageFolders: ['audio'],
      },
      audioRead: {
        id: 'audioRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.audioEditor,
          roles.audioViewer,
        ],
      },
      audioAutocomplete: {
        id: 'audioAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.audioEditor,
          roles.audioViewer,
        ],
      },

      documentImport: {
        id: 'documentImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.documentEditor,
        ],
      },
      documentCreate: {
        id: 'documentCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.documentEditor,
        ],
        allowedStorageFolders: ['document'],
      },
      documentEdit: {
        id: 'documentEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.documentEditor,
        ],
        allowedStorageFolders: ['document'],
      },
      documentDestroy: {
        id: 'documentDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.documentEditor,
        ],
        allowedStorageFolders: ['document'],
      },
      documentRead: {
        id: 'documentRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.documentEditor,
          roles.documentViewer,
        ],
      },
      documentAutocomplete: {
        id: 'documentAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.documentEditor,
          roles.documentViewer,
          roles.taskEditor,
          roles.taskViewer,
        ],
      },

      taxonomyImport: {
        id: 'taxonomyImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taxonomyEditor,
        ],
      },
      taxonomyCreate: {
        id: 'taxonomyCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taxonomyEditor,
        ],
        allowedStorageFolders: ['taxonomy'],
      },
      taxonomyEdit: {
        id: 'taxonomyEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taxonomyEditor,
        ],
        allowedStorageFolders: ['taxonomy'],
      },
      taxonomyDestroy: {
        id: 'taxonomyDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.taxonomyEditor,
        ],
        allowedStorageFolders: ['taxonomy'],
      },
      taxonomyRead: {
        id: 'taxonomyRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.taxonomyEditor,
          roles.taxonomyViewer,
        ],
      },
      taxonomyAutocomplete: {
        id: 'taxonomyAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.taxonomyEditor,
          roles.taxonomyViewer,
          roles.moduleEditor,
          roles.moduleViewer,
        ],
      },

      empaticaImport: {
        id: 'empaticaImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.empaticaEditor,
        ],
      },
      empaticaCreate: {
        id: 'empaticaCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.empaticaEditor,
        ],
        allowedStorageFolders: ['empatica'],
      },
      empaticaEdit: {
        id: 'empaticaEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.empaticaEditor,
        ],
        allowedStorageFolders: ['empatica'],
      },
      empaticaDestroy: {
        id: 'empaticaDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.empaticaEditor,
        ],
        allowedStorageFolders: ['empatica'],
      },
      empaticaRead: {
        id: 'empaticaRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.empaticaEditor,
          roles.empaticaViewer,
        ],
      },
      empaticaAutocomplete: {
        id: 'empaticaAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.empaticaEditor,
          roles.empaticaViewer,
          roles.moduleEditor,
          roles.moduleViewer,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
