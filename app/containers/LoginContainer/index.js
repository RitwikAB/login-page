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
    dispatchSetUserData(values.username, values.password);
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
          name="username"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({ id: 'valid_username' })}`
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={intl.formatMessage({ id: 'username_placeholder' })}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${intl.formatMessage({ id: 'valid_password' })}`
            }
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={intl.formatMessage({ id: 'password_placeholder' })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            <T id="log_in" />
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
    dispatchSetUserData: (username, password) => dispatch(setUser(username, password))
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
