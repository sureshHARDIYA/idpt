import _get from 'lodash/get';
import { createSelector } from 'reselect';

const selectRaw = (state) => state.patient.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => _get(raw, 'record.casedList.rows'),
);

const selectPagination = createSelector(
  [selectRaw],
  (raw, count) => ({
    ...raw.pagination,
    total: count,
    showSizeChanger: true,
  })
);

const selectFilter = createSelector(
  [selectRaw],
  (raw) => raw.filter,
);

const selectSelectedKeys = createSelector(
  [selectRaw],
  (raw) => raw.selectedKeys,
);

export default {
  selectLoading,
  selectRecord,
  selectRaw,
  selectRows,
  selectFilter,
  selectSelectedKeys,
  selectPagination,
};
