import React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import WomanImage from "../../../assets/images/lookin-device.webp";
import Logo from "../../../assets/icons/starbucks_logo.svg";
import "./Login.scss";
import { Auth } from 'aws-amplify';

const CustomizedForm = Form.create({
    name: 'global_state',
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        return {
            email: Form.createFormField({
                ...props.email,
                value: props.email.value,
            }),
            password: Form.createFormField({
                ...props.password,
                value: props.password.value,
            }),
            // remember: Form.createFormField({
            //     ...props.remember,
            //     value: props.remember.value,
            // }),
        };
    },
    onValuesChange(_, values) {
        // console.table(values);
    },
})(props => {
    const { getFieldDecorator, validateFields } = props.form;
    return (
        <section className="login-form-container">
            <Form className="login-form" onSubmit={(e) => props.onSubmit(e, validateFields)}>
                <Form.Item>
                    <span className="login-welcome-title">Welcome!</span>
                    <br />
                    <small>Login to your account</small>
                </Form.Item>
                <Form.Item label="Email" colon={false} hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your email!', }],
                    })(
                        <Input
                            addonBefore={<Icon type="mail" />}
                            placeholder="example@email.com"
                            hasFeedback
                            autoFocus
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Password" colon={false} hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            addonBefore={<Icon type="lock" />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Row gutter={12} type="flex">
                        <Col span={12}>
                            <Button block type="primary" loading={props.isValidating} htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Col>
                        <Col span={12}>
                            <a className="login-form-forgot green" href="">
                                Forgot password
                            </a>
                        </Col>
                    </Row>
                </Form.Item>
                <div className="login-form-actions-container">
                    <span>Already have an account? <a href="" className="green">Join Now!!</a></span>
                </div>
            </Form>
        </section>
    );
});

export class Login extends React.Component {
    state = {
        fields: {
            email: {
                value: '',
            },
            password: {
                value: '',
            },
            // remember: {
            //     value: true,
            // },
        },
        isValidating: false
    };

    handleFormChange = changedFields => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }));
    };

    handleSubmit = (e, onValidate) => {
        e.preventDefault();
        onValidate((err, values) => {
            if (!err) {
                console.table(values);
                this.handleSignIn(values);
            }
        })
    };

    handleSignIn = ({ email, password }) => {
        this.setState({isValidating: true});
        Auth.signIn({username: email, password})
        .then(user => {
            console.log(user);
        })
        .then(() => this.setState({isValidating: false}))
        .catch(err => console.table(err))
    }

    render() {
        const { fields, isValidating } = this.state;
        return (
            <main id="loginView">
                <img src={Logo} alt="Starbucks logo" className="starbucks-logo" />
                <CustomizedForm {...fields} onChange={this.handleFormChange} isValidating={isValidating} onSubmit={this.handleSubmit} />
                <section className="login-decoration-side">
                    <span>Sign In</span>
                    {/* <span><small>Easy and fast</small></span> */}
                    <img src={WomanImage} alt="Woman watching a device" />
                </section>
                {/* <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre> */}
            </main>
        );
    }
}