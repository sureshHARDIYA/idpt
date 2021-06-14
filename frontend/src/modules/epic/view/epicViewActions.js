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

  COUNT_MEDIA_STARTED: `${prefix}_COUNT_MEDIA_STARTED`,

  COUNT_AUDIO_STARTED: `${prefix}_COUNT_AUDIO_STARTED`,
  COUNT_AUDIO_STOPPED: `${prefix}_COUNT_AUDIO_STOPPED`,

  COUNT_VIDEO_STARTED: `${prefix}_COUNT_VIDEO_STARTED`,
  COUNT_VIDEO_STOPPED: `${prefix}_COUNT_VIDEO_STOPPED`,

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

  doTaskStartDocumentCount: (epicId, ids) => (dispatch, getState) => {
    const patientId = _get(getState(), 'auth.currentUser.patientId');
    const ownerId = _get(getState(), 'roadmap.view.record.record.ownerId');

    console.log('():', { epicId, ids, ownerId, patientId })
    console.log('getState():', getState())

    if (ownerId && ownerId === patientId) {
      const timestamp = moment.utc().toDate().getTime();
      const counting = _get(getState(), 'epic.view.document', {});
      const stops = Object.keys(counting || {}).filter((id) => ids.includes(id));

      console.log('stops:', { stops })

      if (stops.length > 0) {
        EpicService.documentCount(epicId, Object.entries(counting).reduce((obj, [id, start]) => {
          const duration = Math.ceil((timestamp - start) / 1000);

          console.log('duration:', { duration })

          if (duration > 0) {
            return [...obj, { id, start: start.toString(), duration }]
          }

          return obj;
        }, []))
        .then(() => dispatch(actions.doFind(epicId, true)));
      }

      dispatch({
        payload: ids.reduce((obj, id) => ({
          ...obj,
          [id]: timestamp,
        }), {}),
        type: actions.COUNT_DOCUMENT_STARTED
      });
    }
  },

  doStartDocumentCount: (epicId, ids) => (dispatch, getState) => {
    const patientId = _get(getState(), 'auth.currentUser.patientId');
    const ownerId = _get(getState(), 'epic.view.record.roadmap.record.ownerId');

    if (ownerId && ownerId === patientId) {
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
        .then(() => dispatch(actions.doFind(epicId, true)));
      }

      dispatch({
        payload: ids.reduce((obj, id) => ({
          ...obj,
          [id]: timestamp,
        }), {}),
        type: actions.COUNT_DOCUMENT_STARTED
      });
    }
  },

  doStartMediaCount: (epicId, id) => (dispatch, getState) => {
    const patientId = _get(getState(), 'auth.currentUser.patientId');
    const ownerId = _get(getState(), 'epic.view.record.roadmap.record.ownerId');

    if (ownerId && ownerId === patientId) {
      const timestamp = moment.utc().toDate().getTime();
      const payload = _get(getState(), 'epic.view.media', {});
      const started = _get(payload, id);

      if (id) {
        if (started) {
          const duration = Math.ceil((timestamp - started) / 1000);
          EpicService
            .documentCount(epicId, [{ id, start: started.toString(), duration }])
            .then(() => dispatch(actions.doFind(epicId, true)));

          delete payload[id];
        } else {
          payload[id] = timestamp
        }

        dispatch ({
          payload,
          type: actions.COUNT_MEDIA_STARTED
        })
      } else if (Object.keys(payload).length){
        EpicService.documentCount(epicId, Object.entries(payload).reduce((obj, [id, start]) => {
          const duration = Math.ceil((timestamp - start) / 1000);

          if (duration > 0) {
            return [...obj, { id, start: start.toString(), duration }]
          }

          return obj;
        }, []))
        .then(() => dispatch(actions.doFind(epicId, true)));

        dispatch ({
          payload: {},
          type: actions.COUNT_MEDIA_STARTED
        })
      }
    }
  }
};

export default actions;
