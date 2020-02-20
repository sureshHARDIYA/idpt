import IamService from 'modules/iam/iamService';
import selectors from 'modules/iam/list/users/iamListUsersSelectors';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import { i18n } from 'i18n';
import exporterFields from 'modules/iam/list/users/iamListUsersExporterFields';
import Exporter from 'modules/shared/exporter/exporter';

const prefix = 'IAM_LIST_USERS';

const actions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  SELECTEDS_CHANGED: `${prefix}_SELECTEDS_CHANGED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  REMOVE_ALL_SELECTED_STARTED: `${prefix}_REMOVE_ALL_SELECTED_STARTED`,
  REMOVE_ALL_SELECTED_SUCCESS: `${prefix}_REMOVE_ALL_SELECTED_SUCCESS`,
  REMOVE_ALL_SELECTED_ERROR: `${prefix}_REMOVE_ALL_SELECTED_ERROR`,

  CHANGE_STATUS_SELECTED_STARTED: `${prefix}_CHANGE_STATUS_SELECTED_STARTED`,
  CHANGE_STATUS_SELECTED_SUCCESS: `${prefix}_CHANGE_STATUS_SELECTED_SUCCESS`,
  CHANGE_STATUS_SELECTED_ERROR: `${prefix}_CHANGE_STATUS_SELECTED_ERROR`,

  doChangeSelected(payload) {
    return {
      type: actions.SELECTEDS_CHANGED,
      payload,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: actions.RESETED,
    });

    dispatch(actions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: actions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());
      const response = await IamService.fetchUsers(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('iam.users.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: actions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.EXPORT_ERROR,
      });
    }
  },

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

    const filter = selectors.selectFilter(getState());

    dispatch(actions.doFetch(filter, true));
  },

  doFetch: (filter, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: actions.FETCH_STARTED,
        payload: { filter, keepPagination },
      });

      const response = await IamService.fetchUsers(
        filter,
        selectors.selectOrderBy(getState()),
        selectors.selectLimit(getState()),
        selectors.selectOffset(getState()),
      );

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

  doDisableAllSelected: () => async (
    dispatch,
    getState,
  ) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.disable(
        selectedRows.map((user) => user.id),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_SUCCESS,
      });

      Message.success(i18n('iam.doDisableAllSuccess'));

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    }
  },

  doEnableAllSelected: () => async (dispatch, getState) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.enable(
        selectedRows.map((user) => user.id),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_SUCCESS,
      });

      Message.success(i18n('iam.doEnableAllSuccess'));

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    }
  },

  doRemoveAllSelected: () => async (dispatch, getState) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_STARTED,
      });

      await IamService.remove(
        selectedRows.map((row) => row.email),
        [],
        true,
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('iam.users.doRemoveAllSelectedSuccess'),
      );

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(actions.doFetch(filter));
    }
  },
};

export default actions;
