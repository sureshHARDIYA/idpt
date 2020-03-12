import list from 'modules/epic/list/epicListReducers';
import view from 'modules/epic/view/epicViewReducers';
import destroy from 'modules/epic/destroy/epicDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  view,
  destroy,
});
