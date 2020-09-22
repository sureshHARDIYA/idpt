import { i18n } from 'i18n';
import _values from 'lodash/values';

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
      patient: 'patient',
      casedEditor: 'casedEditor',
      casedViewer: 'casedViewer',
      moduleEditor: 'moduleEditor',
      moduleViewer: 'moduleViewer',
      taskEditor: 'taskEditor',
      taskViewer: 'taskViewer',
      audioEditor: 'audioEditor',
      audioViewer: 'audioViewer',
      documentEditor: 'documentEditor',
      documentViewer: 'documentViewer',
    };
  }

  static labelOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.label`);
  }

  static descriptionOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }

    return i18n(`roles.${roleId}.description`);
  }

  static get selectOptions() {
    return _values(this.values).map((value) => ({
      id: value,
      value: value,
      title: this.descriptionOf(value),
      label: this.labelOf(value),
    }));
  }
}

export default Roles;
