import { Form, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createProduct } from '../../../services/productService';
import { useSelector } from 'react-redux';
import { globalSelector } from '../../../redux/selector';

const CollectionFormProduct = ({ open, onCancel, getProducts, getTotalPageProduct }) => {

    const [form] = Form.useForm();

    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();
    const global = useSelector(globalSelector);

    const onCreate = async (values, image) => {
        const { upload, ...data } = values;
        const res = await createProduct({ ...data, upload: image });
        if (res.data.isError) {
            toast.error(res.data.msg);
            onCancel();
            return;
        }
        toast.success(res.data.msg);
        onCancel();
        setPreviewImage();
        getProducts();
        getTotalPageProduct();
    }

    return (
        <>

            <Modal
                open={global.categories.length !== 0 ? open : false}
                title="Create a new category"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values, image);
                        })
                        .catch((info) => {
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of product!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="category_id"
                        label='Category'
                    >
                        <Select>
                            {
                                global.categories.map(category =>
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
                                message: 'Please input the price of product!',
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
                                message: 'Please input the price of product!',
                            },
                            {
                                pattern: /^[0-9]*$/,
                                message: 'Vui lòng nhập giá trị số!',
                            },
                        ]}
                    >
                        <Input defaultValue={0} />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the quantity of product!',
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
                                message: 'Please input the description of product!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    {
                        previewImage ? <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <img style={{ width: '100px', height: '100px' }} src={previewImage} alt='' />
                        </Form.Item> : ''
                    }

                    <Form.Item
                        name="upload"
                        label="Image"
                        rules={[
                            {
                                required: true,
                                message: 'Please choose the image of product!',
                            },
                        ]}
                    >
                        <Input type='file' onChange={(e) => { setImage(e.target.files[0]); setPreviewImage(URL.createObjectURL(e.target.files[0])) }} />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    );
};

export default CollectionFormProduct;