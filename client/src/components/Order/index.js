import { useDispatch, useSelector } from "react-redux";
import { globalSelector, userSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { cancelOrder, confirmGetOrder, getOrderByCustomer } from "../../services/orderService";
import { Button, Space, Spin } from "antd";
import moment from "moment";
import ModalCreate from "../ModalCreate";
import TableCustom from "../Table/TableCustom";
import Paginate from "../Paginate";

const Order = () => {

    const user = useSelector(userSelector);
    const global = useSelector(globalSelector);
    const [orders, setOrders] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [loading, setLoading] = useState(false);

    const getMyOrders = async () => {
        setLoading(true);
        const res = await getOrderByCustomer(user.id, global.page);
        setOrders(res.data.data.rows);
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await getOrderByCustomer(user.id, global.page);
        setTotalPage(res.data.data.count / res.data.data.rows.length);
        setLoading(false);
    }

    const handleCancel = async (id, pid) => {
        setLoading(true);
        const res = await cancelOrder(user?.id, id, pid);
        if (!res.data.isError) {
            getMyOrders();
            getTotalPage();
        }
        setLoading(false);
    }

    const handleConfirmGetOrder = async (id) => {
        setLoading(true);
        const res = await confirmGetOrder(user?.id, { id, getted_date: moment().format('YYYY-MM-DD HH:mm:ss') });
        if (!res.data.isError) {
            getMyOrders();
            getTotalPage();
        }
        setLoading(false);
    }

    useEffect(() => {
        getMyOrders();
    }, [user.id, global.page])

    useEffect(() => {
        getTotalPage();
    }, [user.id])

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => (
                <Space size='middle'>
                    {console.log(record)}
                    <img style={{ width: '100px', height: '100px' }} src={`http://localhost:5000/${record?.image}`} alt='' />
                </Space>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'created_date',
            key: 'created_date'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle' style={{ display: 'flex', alignItems: 'center' }}>
                    <Button type="primary" onClick={() => handleConfirmGetOrder(record?.id)} disabled={record?.status === 'Chờ lấy hàng' ? false : true}>Xác nhận</Button>
                    <Button onClick={() => handleCancel(record?.id, record?.product_id)} disabled={record?.status === 'Chờ xác nhận' ? false : true}>Hủy đơn</Button>
                    {record?.status === 'Đã nhận được hàng' && <ModalCreate type='đánh giá' pid={record?.product_id} />}
                </Space>
            ),
        }
    ]

    let data = [];
    orders && orders.forEach((order, index) =>
        data.push({
            id: order.id,
            product_id: order?.Product?.id,
            stt: index + 1,
            phone: order?.phone,
            address: `${order?.wards}, ${order?.district}, ${order?.city}`,
            productName: order?.Product?.name,
            image: order?.Product?.image,
            quantity: order?.quantity,
            price: order?.price,
            created_date: order?.created_date,
            status: order?.status
        })
    )

    return (
        <>
            <Spin spinning={loading}>
                <TableCustom column={column} data={data} title='đơn hàng' />
            </Spin>
            {orders.length !== 0 && <Paginate totalPage={totalPage} location='right' />}
        </>
    );
}

export default Order;