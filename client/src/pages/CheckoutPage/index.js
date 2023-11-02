import { CheckoutItemStyled, CheckoutStyled, TitleFields, ButtonCheckOut } from './styled';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Radio, Row, Col } from 'antd';
import countries from 'country-telephone-data';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { getTotalInCart, removeAllCart } from '../../services/cartService';
import CheckoutItem from './CheckoutItem';
import { LeftOutlined } from '@ant-design/icons';
import { addToOrder } from '../../services/orderService';
import globalSlice from '../../redux/globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selector';
import moment from 'moment';
import { toast } from 'react-toastify'

const { Option } = Select;


const Checkout = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('');

    const [quantity, setQuantity] = useState();
    const [items, setItems] = useState([]);


    useEffect(() => {
        if (!Cookies.get('cart') || (Cookies.get('cart') && JSON.parse(Cookies.get('cart').slice(2)).length === 0)) navigate('/gio-hang');
    }, [])

    useEffect(() => {
        setItems(JSON.parse(Cookies.get('cart').slice(2)));
        setQuantity(getTotalInCart());
    }, [global.reRender])

    useEffect(() => {
        const getLocations = async () => {
            const res = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
            setCities(res.data)
        }
        getLocations()
    }, [])

    const handleCityChange = (event) => {
        const selectedCity = event;
        setSelectedCity(selectedCity);

        const city = cities.find((c) => c?.Name === selectedCity);
        const districts = city ? city?.Districts : [];
        setDistricts(districts);
        setSelectedDistrict('');
        setWards([]);
        setSelectedWard('');
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event;
        setSelectedDistrict(selectedDistrict);

        const city = cities.find((c) => c?.Name === selectedCity);
        const district = city ? city?.Districts?.find((d) => d?.Name === selectedDistrict) : null;
        const wards = district ? district?.Wards : [];
        setWards(wards);
        setSelectedWard('');
    };

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                defaultValue={countries?.allCountries.find(country => country.dialCode == '84').dialCode}
                style={{
                    width: 80,
                }}
            >
                {
                    countries?.allCountries.map((country, index) =>
                        <Option key={index} value={country.dialCode}>+{country.dialCode}</Option>
                    )
                }
            </Select>
        </Form.Item >
    );

    const onFinish = async (values) => {
        if (!user.is_login) {
            navigate('/dang-nhap');
            return;
        }
        const res = await addToOrder(user.id, { ...values, created_date: moment().format('YYYY-MM-DD HH:mm:ss') });
        if (res.data) {
            removeAllCart();
            toast.success('Đặt hàng thành công');
            dispatch(globalSlice.actions.changeRerender(!global.reRender));
            navigate('/');
        }
    };

    return (
        <CheckoutStyled>
            <div style={{ width: '100%' }}>
                <Link style={{ display: 'block', margin: 'auto', width: '200px', height: '150px', marginTop: '20px' }} to={'/'}>
                    <img style={{ backgroundColor: '#b5313a', borderRadius: '50%', width: '100%', height: '100%' }} src='https://bizweb.dktcdn.net/100/465/740/themes/884110/assets/logo.png?1693532040126' alt='' />
                </Link>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
                scrollToFirstError
            >
                <div className='content'>
                    <Row justify='space-around'>
                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <TitleFields>Thông tin nhận hàng</TitleFields>
                            <Form.Item
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập vào địa chỉ của bạn',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder='Địa chỉ'
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập vào số điện thoại của bạn',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder='Số điện thoại'
                                    addonAfter={suffixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập tỉnh thành của bạn',
                                    },
                                ]}
                            >
                                <Select placeholder="Tỉnh thành" onChange={(e) => handleCityChange(e)} value={selectedCity}>
                                    <Option value="" disabled>Chọn tỉnh thành</Option>
                                    {cities.map((city) => (
                                        <Option key={city?.Id} value={city?.Name}>
                                            {city?.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="district"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập quận huyện của bạn',
                                    },
                                ]}
                            >
                                <Select placeholder="Quận huyện" value={selectedDistrict} onChange={(e) => handleDistrictChange(e)} disabled={!selectedCity}>
                                    <Option value="" disabled>Chọn quận huyện</Option>
                                    {districts.map((district) => (
                                        <Option key={district?.Id} value={district?.Name}>
                                            {district?.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="wards"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Hãy nhập phường xã của bạn',
                                    },
                                ]}
                            >
                                <Select placeholder="Phường xã" value={selectedWard} onChange={(event) => setSelectedWard(event)} disabled={!selectedDistrict}>
                                    <Option value="" disabled>Chọn phường xã</Option>
                                    {wards.map((ward) => (
                                        <Option key={ward?.Id} value={ward?.Name}>
                                            {ward?.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <div>
                                <TitleFields>Thanh toán</TitleFields>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Hãy chọn phương thức thanh toán',
                                        }
                                    ]}
                                >
                                    <Radio.Group style={{ border: '1px solid #cecdcd', padding: '16px 13px', width: '100%' }}>
                                        <Radio value="1">Thanh toán khi giao hàng (COD) </Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </Col>

                        <Col xl={7} lg={24} md={24} sm={24} xs={24}>
                            <TitleFields>Đơn hàng ({quantity} sản phẩm)</TitleFields>
                            {
                                items.map((item, index) =>
                                    <CheckoutItem key={index} item={item} />
                                )
                            }
                            <CheckoutItemStyled>
                                <span style={{ fontSize: '18px' }}>Tổng cộng</span>
                                <span style={{ fontSize: '18px', fontWeight: 700 }}>{items.reduce((total, item) => { return total + item?.price }, 0)?.toFixed()}.000đ</span>
                            </CheckoutItemStyled>
                            <Form.Item>
                                <CheckoutItemStyled>
                                    <Link to={'/gio-hang'}><LeftOutlined />Quay về giỏ hàng</Link>
                                    <ButtonCheckOut htmlType="submit">
                                        Đặt hàng
                                    </ButtonCheckOut>
                                </CheckoutItemStyled>
                            </Form.Item>
                        </Col>
                    </Row>


                </div>

            </Form>

        </CheckoutStyled >
    );
}

export default Checkout;