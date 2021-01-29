import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const selectLoginContainer = state => state.loginContainer;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location
  );

const selectUserEmail = () =>
  createSelector(
    selectLoginContainer,
    userState => userState.email
  );

export { makeSelectLocation, selectUserEmail };
