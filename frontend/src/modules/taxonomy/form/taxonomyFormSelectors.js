import { createSelector } from 'reselect';

const selectRaw = (state) => state.taxonomy.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectFindLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.findLoading,
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.saveLoading,
);

export default {
  selectFindLoading,
  selectSaveLoading,
  selectRecord,
  selectRaw,
};

