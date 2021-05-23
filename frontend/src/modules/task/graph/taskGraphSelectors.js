import { createSelector } from 'reselect';

const selectRaw = (state) => state.task.graph;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.filter;
  },
);

export default {
  selectLoading,
  selectRows,
  selectRecord,
  selectFilter,
};
