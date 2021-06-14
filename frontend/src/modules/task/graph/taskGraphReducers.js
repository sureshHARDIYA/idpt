import actions from 'modules/task/graph/taskGraphActions';

const initialData = {
  rows: [],
  count: 0,
  loading: false,
  filter: {},
  record: null,
};

export default (state = initialData, {type, payload}) => {
  if (type === actions.DESELECT_RECORD) {
    return {
      ...state,
      record: null,
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      record: null,
      filter: payload ? payload.filter : {},
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      record: null,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      record: null,
      count: 0,
    };
  }

  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      record: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      record: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      record: null,
      loading: false,
    };
  }

  return state;
};
