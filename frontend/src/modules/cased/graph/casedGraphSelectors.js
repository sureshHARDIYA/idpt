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

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

export default {
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
  selectRecord,
};
