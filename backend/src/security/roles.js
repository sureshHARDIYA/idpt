/**
 * List of Roles available for the Users.
 */
class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      patientEditor: 'patientEditor',
      patientViewer: 'patientViewer',
      casedEditor: 'casedEditor',
      casedViewer: 'casedViewer',
      moduleEditor: 'moduleEditor',
      moduleViewer: 'moduleViewer',
      taskEditor: 'taskEditor',
      taskViewer: 'taskViewer',
      recordEditor: 'recordEditor',
      recordViewer: 'recordViewer',
      audioEditor: 'audioEditor',
      audioViewer: 'audioViewer',
      documentEditor: 'documentEditor',
      documentViewer: 'documentViewer',
      epicEditor: 'epicEditor',
    };
  }
}

module.exports = Roles;
