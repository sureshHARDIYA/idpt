import PatientService from 'modules/patient/patientService';
import Errors from 'modules/shared/error/errors';
import { getHistory } from 'modules/store';
import selectors from 'modules/patient/view/patientViewSelectors';

const prefix = 'PATIENT_VIEW';

const actions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  SELECTEDS_CHANGED: `${prefix}_SELECTEDS_CHANGED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doFind: (id, filter) => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });

      const record = await PatientService.find(id, filter);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/patient');
    }
  },

  doChangeSelected: (payload) => ({
    payload,
    type: actions.SELECTEDS_CHANGED,
  }),

  doChangePaginationAndSort: (
    pagination,
    sorter,
  ) => async (dispatch, getState) => {
    dispatch({
      type: actions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch({
      type: actions.SORTER_CHANGED,
      payload: sorter,
    });

    const record = selectors.selectRecord(getState());
    const filter = selectors.selectFilter(getState());

    dispatch(actions.doFind(record.id, filter));
  },

};

export default actions;
