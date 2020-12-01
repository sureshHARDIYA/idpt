import React, { Component } from 'react';
import { Modal } from 'antd';
import { i18n } from 'i18n';
import TaxonomyForm from 'view/taxonomy/form/TaxonomyForm';
import TaxonomyService from 'modules/taxonomy/taxonomyService';
import Errors from 'modules/shared/error/errors';

class TaxonomyFormModal extends Component {
  state = {
    saveLoading: false,
  };

  doSubmit = async (_, data) => {
    try {
      this.setState({
        saveLoading: true,
      });
      const { id } = await TaxonomyService.create(data);
      const record = await TaxonomyService.find(id);
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
        title={i18n('entities.taxonomy.new.title')}
        visible={this.props.visible}
        onCancel={() => this.props.onCancel()}
        footer={false}
        width="80%"
      >
        <TaxonomyForm
          saveLoading={this.state.saveLoading}
          onSubmit={this.doSubmit}
          onCancel={this.props.onCancel}
          modal
        />
      </Modal>
    );
  }
}

export default TaxonomyFormModal;
