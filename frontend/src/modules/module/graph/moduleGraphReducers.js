import actions from 'modules/module/graph/moduleGraphActions';


const initialData = {
  rows: [],
  count: 0,
  loadingRecord: false,
  loadingRows: false,
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
      loadingRows: true,
      record: null,
      filter: payload ? payload.filter : {},
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loadingRows: false,
      rows: payload.rows,
      record: null,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loadingRows: false,
      rows: [],
      record: null,
      count: 0,
    };
  }

  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      record: null,
      loadingRecord: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      record: payload,
      loadingRecord: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      record: null,
      loadingRecord: false,
    };
  }

  return state;
};
