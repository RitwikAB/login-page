import { loginContainerReducer, loginContainerTypes, initialState } from '../reducer';

describe('LoginContainer reducer test', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(loginContainerReducer(undefined, {})).toEqual(state);
  });

  it('should ensure that the user data is present SET_USER is dispatched', () => {
    const data = { email: 'testemail@test.com', password: 'testPASSWORD123' };
    const expectedResult = { ...state, email: data.email, password: data.password };
    expect(
      loginContainerReducer(state, {
        type: loginContainerTypes.SET_USER,
        email: data.email,
        password: data.password
      })
    ).toEqual(expectedResult);
  });
});
