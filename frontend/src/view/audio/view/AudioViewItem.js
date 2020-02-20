import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { viewItemLayout } from 'view/shared/styles/ViewWrapper';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from 'modules/audio/audioSelectors';

class AudioViewItem extends Component {
  valueAsArray = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  displayableRecord = (record) => {
    if (this.props.hasPermissionToRead) {
      return (
        <div key={record.id}>
          <Link to={`/audio/${record.id}`}>
            {record['url']}
          </Link>
        </div>
      );
    }

    return (
      <div key={record.id}>
        {record['url']}
      </div>
    );
  };

  render() {
    if (!this.valueAsArray().length) {
      return null;
    }

    return (
      <Form.Item
        {...viewItemLayout}
        label={this.props.label}
      >
        {this.valueAsArray().map((value) =>
          this.displayableRecord(value),
        )}
      </Form.Item>
    );
  }
}

AudioViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

const select = (state) => ({
  hasPermissionToRead: selectors.selectPermissionToRead(
    state,
  ),
});

export default connect(select)(AudioViewItem);
