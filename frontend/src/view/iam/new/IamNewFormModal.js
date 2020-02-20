import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import IamNewForm from 'view/iam/new/IamNewForm';
import Errors from 'modules/shared/error/errors';
import IamService from 'modules/iam/iamService';

class IamNewFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      await IamService.create(data);
      const { rows } = await IamService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );
      this.props.onSuccess(rows[0]);
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
        title={i18n('iam.new.titleModal')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <IamNewForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
          single
        />
      </Modal>
    );
  }
}

export default IamNewFormModal;
