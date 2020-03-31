import EpicService from 'modules/epic/epicService';
import Errors from 'modules/shared/error/errors';
import { getHistory } from 'modules/store';
import _get from 'lodash/get';
import moment from 'moment';

const prefix = 'EPIC_VIEW';

const actions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  COUNT_DOCUMENT_STARTED: `${prefix}_COUNT_DOCUMENT_STARTED`,
  COUNT_DOCUMENT_STOPPED: `${prefix}_COUNT_DOCUMENT_STOPPED`,

  doFind: (id, reload = false) => async (dispatch) => {
    try {
      !reload && dispatch({
        type: actions.FIND_STARTED,
      });

      const record = await EpicService.find(id);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: record,
      });

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/record');
    }
  },

  doStartDocumentCount: (epicId, ids) => (dispatch, getState) => {
    const timestamp = moment.utc().toDate().getTime();
    const counting = _get(getState(), 'epic.view.document', {});
    const stops = Object.keys(counting || {}).filter((id) => !ids.includes(id));

    if (stops.length > 0) {
      EpicService.documentCount(epicId, Object.entries(counting).reduce((obj, [id, start]) => {
        const duration = Math.ceil((timestamp - start) / 1000);

        if (duration > 0) {
          return [...obj, { id, start: start.toString(), duration }]
        }

        return obj;
      }, []))
      .then((rs) => {
        if (_get(getState(), 'epic.view.record.state') !== _get(rs, 'state')) {
          dispatch(actions.doFind(epicId, true));
        }
      });
    }

    dispatch({
      payload: ids.reduce((obj, id) => ({
        ...obj,
        [id]: timestamp,
      }), {}),
      type: actions.COUNT_DOCUMENT_STARTED
    });
  }
};

export default actions;
