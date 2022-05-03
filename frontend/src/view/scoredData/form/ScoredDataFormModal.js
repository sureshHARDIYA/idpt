import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import ScoredDataForm from 'view/scoredData/form/ScoredDataForm';
import ScoredDataService from 'modules/scoredData/scoredDataService';
import Errors from 'modules/shared/error/errors';

class ScoredDataFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await ScoredDataService.create(data);
      const record = await ScoredDataService.find(id);
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
        title={i18n('entities.scoredData.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <ScoredDataForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default ScoredDataFormModal;
