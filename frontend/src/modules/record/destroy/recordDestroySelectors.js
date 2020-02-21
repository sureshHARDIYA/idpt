import { createSelector } from 'reselect';

const selectRaw = (state) => state.record.destroy;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

export default {
  selectLoading
};

