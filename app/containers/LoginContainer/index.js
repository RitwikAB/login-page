import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
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

const LoginContainer = ({ maxwidth, padding }) => {
  const onFinish = values => {
    // eslint-disable-next-line no-console
    console.log('Received values of form: ', values);
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
              message: 'Please input your Username!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

LoginContainer.propTypes = {
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

LoginContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

export default injectIntl(LoginContainer);
