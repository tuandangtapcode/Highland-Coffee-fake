import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authService';
import { userSelector } from '../../redux/selector';
import { ProfileContainer } from './styled'

const ChangePassword = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const user = useSelector(userSelector);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await changePassword(user.id, values);
            if (response.data.isError) {
                toast.error(response.data.msg);
                return;
            }
            toast.success(response.data.msg);
            form.resetFields();
        } finally {
            setLoading(true);
        }
    };


    return (
        <ProfileContainer>
            <h2>Đổi mật khẩu</h2>
            <Form form={form} onFinish={onFinish} style={{ maxWidth: '500px' }}>
                <Form.Item
                    name="oldpassword"
                    label="Mật khẩu cũ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu cũ!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="newpassword"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirmnewpassword"
                    label="Xác nhận mật khẩu mới"
                    dependencies={['newpassword']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu mới!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newpassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Mật khẩu xác nhận không khớp!');
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </ProfileContainer>
    );
}

export default ChangePassword;