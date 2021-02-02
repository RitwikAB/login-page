import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { loginContainerCreators } from './reducer';
import T from '@components/T';

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;

const LoginContainer = ({ maxwidth, padding, dispatchSetUserData, intl }) => {
  const onFinish = values => {
    dispatchSetUserData(values.email, values.password);
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <T id="login_page" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: `${intl.formatMessage({ id: 'valid_email' })}`
            },
            {
              required: true,
              message: `${intl.formatMessage({ id: 'require_email' })}`
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={intl.formatMessage({ id: 'email_placeholder' })}
            data-testid="email-textfield"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({ id: 'require_password' })}`
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            title={intl.formatMessage({ id: 'valid_password' })}
            placeholder={intl.formatMessage({ id: 'password_placeholder' })}
            data-testid="password-textfield"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            data-testid="login-button"
            onClick={onFinish}
          >
            <T id="log_in" />
            PR test
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

LoginContainer.propTypes = {
  dispatchSetUserData: PropTypes.func,
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

LoginContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapDispatchToProps = dispatch => {
  const { setUser } = loginContainerCreators;
  return {
    dispatchSetUserData: (email, password) => dispatch(setUser(email, password))
  };
};

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect
)(LoginContainer);

export const LoginContainerTest = compose(injectIntl)(LoginContainer);
