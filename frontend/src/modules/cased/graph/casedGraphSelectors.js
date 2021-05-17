import { createSelector } from 'reselect';

const selectRaw = (state) => state.cased.graph;

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

export default {
  selectLoading,
  selectRows,
  selectRecord,
};
