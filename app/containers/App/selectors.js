import { createSelector } from 'reselect';

const selectRouter = state => state.router;

const selectLoginContainer = state => state.loginContainer;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location
  );

const selectUsername = () =>
  createSelector(
    selectLoginContainer,
    userState => userState.username
  );

export { makeSelectLocation, selectUsername };
