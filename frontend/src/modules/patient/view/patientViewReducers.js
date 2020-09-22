import actions from 'modules/patient/view/patientViewActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  loading: false,
  record: null,
  filter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
  selectedKeys: [],
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

  if (type === actions.SELECTEDS_CHANGED) {
    return {
      ...state,
      selectedKeys: payload || [],
    };
  }

  return state;
};
