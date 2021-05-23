import TaskService from 'modules/task/taskService';
import Errors from 'modules/shared/error/errors';

const prefix = 'TASK_GRAPH';

const actions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  SELECT_RECORD: `${prefix}_SELECT_RECORD`,

  doChangeSelected(payload) {
    return {
      type: actions.SELECT_RECORD,
      payload,
    };
  },

  doFetch: (filter) => async (
    dispatch,
  ) => {
    try {
      dispatch({
        type: actions.FETCH_STARTED,
        payload: {filter},
      });

      const response = await TaskService.graph(filter);

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
