import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import selectors from 'modules/audio/audioSelectors';

class AudioListItem extends Component {
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

    return this.valueAsArray().map((value) =>
      this.displayableRecord(value),
    );
  }
}

AudioListItem.propTypes = {
  value: PropTypes.any,
};

const select = (state) => ({
  hasPermissionToRead: selectors.selectPermissionToRead(
    state,
  ),
});

export default connect(select)(AudioListItem);
