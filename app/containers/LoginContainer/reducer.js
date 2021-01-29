import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: loginContainerTypes, Creators: loginContainerCreators } = createActions({
  setUser: ['email', 'password'],
  signOutUser: []
});

export const initialState = { email: null, password: null };

export const loginContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case loginContainerTypes.SET_USER:
        draft.email = action.email;
        draft.password = action.password;
        break;
      case loginContainerTypes.SIGN_OUT_USER:
        return initialState;
    }
  });

export default loginContainerReducer;
