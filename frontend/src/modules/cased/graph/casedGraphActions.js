import CasedService from 'modules/cased/casedService';
import selectors from 'modules/cased/graph/casedGraphSelectors';
import Errors from 'modules/shared/error/errors';

const prefix = 'CASED_GRAPH';

const actions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  SELECT_RECORD: `${prefix}_SELECT_RECORD`,
  DESELECT_RECORD: `${prefix}_DESELECT_RECORD`,

  doChangeSelected: (payload) => async (dispatch, getState) => {
    const rows = selectors.selectRows(getState());
    const record = rows.find(record => record.id === payload);

    dispatch({
      type: actions.SELECT_RECORD,
      payload: record,
    });
  },

  doDeselect() {
    return {
      type: actions.DESELECT_RECORD,
    };
  },

  doFetch: () => async (
    dispatch,
  ) => {
    try {
      dispatch({
        type: actions.FETCH_STARTED,
        payload: {},
      });

      const response = await CasedService.graph();

      dispatch({
        type: actions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FETCH_ERROR,
      });
    }
  },
};

export default actions;
