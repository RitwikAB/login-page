import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { LoginContainerTest as LoginContainer } from '../index';

describe('<LoginContainer /> tests', () => {
  it('should call setUser when click on login button', () => {
    const setUserSpy = jest.fn();
    const { getByTestId } = renderProvider(<LoginContainer dispatchSetUserData={setUserSpy} />);
    fireEvent.change(getByTestId('email-textfield'), {
      target: { value: 'testemail@test.com' }
    });
    fireEvent.change(getByTestId('password-textfield'), {
      target: { value: 'testPASSWORD123' }
    });
    fireEvent.click(getByTestId('login-button'));
    expect(setUserSpy).toBeCalled();
  });
});
