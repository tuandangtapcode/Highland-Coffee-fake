import { Form, Input, Modal } from 'antd';
import { toast } from 'react-toastify';
import socket from '../../../utils/socket';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/selector';
import { sendComment } from '../../../services/commentService';

const CollectionFormComment = ({ open, onCancel, pid }) => {

    const [form] = Form.useForm();
    const user = useSelector(userSelector);

    const onCreate = async (values) => {
        const data = {
            customer_id: user.id,
            product_id: pid,
            text: values.text
        }
        socket.emit('send-comment', { ...data, Customer: { fullname: user.name }, createdAt: moment().format('YYYY-MM-DD HH:mm:ss') });
        const res = await sendComment(data);
        if (res.data) {
            toast.success('Cảm ơn vì đánh giá của bạn!');
        } else {
            toast.error('Có lỗi');
        }
        onCancel();
    }

    return (
        <Modal
            open={open}
            title="Đánh giá"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"

            >
                <Form.Item
                    name="text"
                    label="Đánh giá"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the name of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CollectionFormComment;