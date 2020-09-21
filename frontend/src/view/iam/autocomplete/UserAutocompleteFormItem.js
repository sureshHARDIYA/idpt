import React, { Component } from 'react';
import IamService from 'modules/iam/iamService';
import AutocompleteFormItem from 'view/shared/form/items/AutocompleteFormItem';
import IamNewFormModal from 'view/iam/new/IamNewFormModal';
import { connect } from 'react-redux';
import selectors from 'modules/iam/iamSelectors';

class UserAutocompleteFormItem extends Component {
  state = {
    modalVisible: false,
  };

  doCloseModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  doOpenModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  doCreateSuccess = (record) => {
    const { form, name, mode } = this.props;

    if (mode && mode === 'multiple') {
      form.setFieldValue(name, [
        ...(form.values[name] || []),
        record,
      ]);
    } else {
      form.setFieldValue(name, record);
    }

    this.doCloseModal();
  };

  fetchFn = (value, limit) => {
    return IamService.fetchUserAutocomplete(value, limit);
  };

  mapper = {
    toAutocomplete(value) {
      if (!value) {
        return undefined;
      }

      if (value.fullName || value.email) {
        let label = value.email;

        if (value.fullName) {
          label = `${value.fullName} <${value.email}>`;
        }

        return {
          key: value.id,
          label,
        };
      }

      if (typeof value === 'string') {
        return {
          key: value,
        };
      }

      return {
        key: value.id,
        label: value.label,
      };
    },

    toValue(value) {
      if (!value) {
        return undefined;
      }

      return {
        id: value.key,
        label: value.label,
      };
    },
  };

  render() {
    return (
      <React.Fragment>
        <AutocompleteFormItem
          {...this.props}
          fetchFn={this.fetchFn}
          mapper={this.mapper}
          onOpenModal={this.doOpenModal}
        />

        <IamNewFormModal
          visible={this.state.modalVisible}
          onCancel={this.doCloseModal}
          onSuccess={this.doCreateSuccess}
        />
      </React.Fragment>
    );
  }
}

const select = (state) => ({
  hasPermissionToCreate: selectors.selectPermissionToCreate(
    state,
  ),
});

export default connect(select)(UserAutocompleteFormItem);
