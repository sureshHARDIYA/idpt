import { createSelector } from 'reselect';

const selectRaw = (state) => state.scoredData.destroy;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

export default {
  selectLoading
};

