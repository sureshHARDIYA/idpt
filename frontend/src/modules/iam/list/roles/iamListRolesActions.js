import IamService from 'modules/iam/iamService';
import selectors from 'modules/iam/list/roles/iamListRolesSelectors';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import groupBy from 'lodash/groupBy';
import { i18n } from 'i18n';

const prefix = 'IAM_LIST_ROLES';

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

      const response = await IamService.fetchRoles(
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.disable(
        selectedChildren.map(
          (selectedChild) => selectedChild.userId,
        ),
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.enable(
        selectedChildren.map(
          (selectedChild) => selectedChild.userId,
        ),
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_STARTED,
      });

      const group = groupBy(selectedChildren, 'role');

      for (const role of Object.keys(group)) {
        await IamService.remove(
          group[role].map((user) => user.email),
          [role],
        );
      }

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('iam.roles.doRemoveAllSelectedSuccess'),
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
