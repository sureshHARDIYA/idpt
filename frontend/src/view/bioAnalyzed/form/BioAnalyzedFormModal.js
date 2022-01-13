import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import BioAnalyzedForm from 'view/bioAnalyzed/form/BioAnalyzedForm';
import BioAnalyzedService from 'modules/bioAnalyzed/bioAnalyzedService';
import Errors from 'modules/shared/error/errors';

class BioAnalyzedFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await BioAnalyzedService.create(data);
      const record = await BioAnalyzedService.find(id);
      this.props.onSuccess(record);
    } catch (error) {
      Errors.handle(error);
    } finally {
      this.setState({
        saveLoading: false,
      });
    }
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        title={i18n('entities.bioAnalyzed.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <BioAnalyzedForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default BioAnalyzedFormModal;
