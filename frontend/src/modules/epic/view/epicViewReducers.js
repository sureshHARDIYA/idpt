import actions from 'modules/epic/view/epicViewActions';

const initialData = {
  loading: false,
  record: null,
  document: null,
};

export default (state = initialData, { type, payload }) => {
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

  if (type === actions.COUNT_DOCUMENT_STARTED) {
    return {
      ...state,
      document: payload,
    };
  }

  return state;
};
