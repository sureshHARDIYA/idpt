import list from 'modules/roadmap/list/roadmapListReducers';
import view from 'modules/roadmap/view/roadmapViewReducers';
import destroy from 'modules/roadmap/destroy/roadmapDestroyReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  view,
  destroy,
});
