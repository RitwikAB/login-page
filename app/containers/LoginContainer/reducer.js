import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: loginContainerTypes, Creators: loginContainerCreators } = createActions({
  setUser: ['username', 'password'],
  signOutUser: []
});

export const initialState = { username: null, password: null };

export const loginContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginContainerTypes.SET_USER:
        draft.username = action.username;
        draft.password = action.password;
        break;
      case loginContainerTypes.SIGN_OUT_USER:
        return initialState;
    }
  });

export default loginContainerReducer;
