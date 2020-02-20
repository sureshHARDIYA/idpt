import actions from 'modules/auth/authActions';

export default (store) => {
  store.dispatch(actions.doInit());
};
