import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/task/importer/taskImporterSelectors';
import TaskService from 'modules/task/taskService';
import fields from 'modules/task/importer/taskImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'TASK_IMPORTER',
  selectors,
  TaskService.import,
  fields,
  i18n('entities.task.importer.fileName'),
);
