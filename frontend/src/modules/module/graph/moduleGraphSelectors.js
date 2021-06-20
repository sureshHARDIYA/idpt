import { createSelector } from 'reselect';

const selectRaw = (state) => state.module.graph;

const selectLoadingRecord = createSelector(
  [selectRaw],
  (raw) => raw.loadingRecord,
);

const selectLoadingRows = createSelector(
  [selectRaw],
  (raw) => raw.loadingRows,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => {
    return raw.loadingRows || raw.loadingRecord;
  }
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

const selectFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.filter;
  },
);

export default {
  selectLoadingRecord,
  selectLoadingRows,
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
  selectRecord,
  selectFilter,
};
