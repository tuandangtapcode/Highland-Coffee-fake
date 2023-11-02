import { Button, Form, Input, Select } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutAdmin from "../../../../components/Layouts/LayoutAdmin";
import { getAllCategoriesNotPageinate, updateCategory } from '../../../../services/categoryService';
import TextArea from 'antd/es/input/TextArea';
import { getDetailProduct, updateProduct } from '../../../../services/productService';


const AdminDetailProduct = () => {

    const { slug } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([]);
    const [cateid, setCateid] = useState();
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        const getCategories = async () => {
            const res = await getAllCategoriesNotPageinate();
            setCategories(res.data);
        }
        getCategories();
    }, [])

    useEffect(() => {
        const getDetail = async () => {
            const res = await getDetailProduct(slug);
            if (res.data) {
                setCateid(res.data.category_id);
                setPreviewImage(`http://localhost:5000/${res.data.image}`);
                form.setFieldsValue({
                    name: res.data.name,
                    category_id: res.data.category_id,
                    price: res.data.price,
                    discount: res.data.discount,
                    quantity: res.data.quantity,
                    description: res.data.description,
                    image: res.data.image,
                })
            } else {
                navigate('/not-found');
            }
        }
        getDetail();
    }, [form])

    const onFinish = async (values) => {
        const res = await updateProduct(slug, image ? {...values, upload: image} : values);
        if (res.data) {
            toast.success("Cập nhật thành công!");
            navigate('/admin/san-pham');
        } else {
            toast.error('Có lỗi');
        }

    }

    return (
        <LayoutAdmin>
            <Form
                name="basic"
                labelCol={{
                    offset: 0,
                    span: 5,
                }}
                wrapperCol={{
                    offset: 0,
                    span: 19,
                }}
                style={{
                    maxWidth: 600,
                }}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="category_id"
                    label='Category'
                >
                    <Select defaultValue={cateid}>
                        {
                            categories.map(category =>
                                <Select.Option value={category.id}>{category.name}</Select.Option>
                            )
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Vui lòng nhập giá trị số!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="discount"
                    label="Discount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Vui lòng nhập giá trị số!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label="Quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                        {
                            pattern: /^[0-9]*$/,
                            message: 'Vui lòng nhập giá trị số!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item>
                    <img style={{ width: '200px', height: '200px' }} src={previewImage} alt='' />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Image"
                >
                    <Input type='file' onChange={(e) => { setImage(e.target.files[0]); setPreviewImage(URL.createObjectURL(e.target.files[0])) }} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 16,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </LayoutAdmin>
    );
}
 
export default AdminDetailProduct;