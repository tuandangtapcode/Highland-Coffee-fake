import { Button, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { globalSelector } from "../../../redux/selector";
import { cancelOrder, confirmOrder, gettAllOrdersWaiting } from "../../../services/orderService";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import Paginate from "../../../components/Paginate";
import moment from 'moment';

const AdminWaitingForConfirm = () => {

    const [waitings, setWaiting] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const global = useSelector(globalSelector);

    const gettOrdersWaiting = async () => {
        setLoading(true);
        const res = await gettAllOrdersWaiting(global.page);
        if (res.data) {
            setWaiting(res.data.rows);
        }
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await gettAllOrdersWaiting(global.page);
        if (res.data) {
            setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
        }
        setLoading(false);
    }

    const handleConfirmOrder = async (id, product_id) => {
        setLoading(true);
        const res = await confirmOrder({ id, product_id, confirmed_date: moment().format('YYYY-MM-DD HH:mm:ss') });
        if (res.data) {
            gettOrdersWaiting();
            getTotalPage();
        }
        setLoading(false);
    }

    const handleCancelOrder = async (id, pid) => {
        setLoading(true);
        const res = await cancelOrder(id, pid);
        if (res.data) {
            gettOrdersWaiting();
            getTotalPage();
        }
        setLoading(false);
    }

    useEffect(() => {
        gettOrdersWaiting();
    }, [global.page])

    useEffect(() => {
        getTotalPage();
    }, [])


    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName'
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
                <Space size='middle'>
                    <Button type="primary" onClick={() => handleConfirmOrder(record?.id, record?.product_id)}>Xác nhận</Button>
                    <Button onClick={() => handleCancelOrder(record?.id, record?.product_id)}>Hủy</Button>
                </Space>
            ),
        }
    ]

    let data = [];
    waitings && waitings.forEach((waiting, index) =>
        data.push({
            id: waiting?.id,
            product_id: waiting?.Product?.id,
            stt: index + 1,
            customerName: waiting?.Customer?.fullname,
            phone: waiting?.phone,
            address: waiting?.address,
            productName: waiting?.Product?.name,
            image: waiting?.Product?.image,
            quantity: waiting?.quantity,
            price: waiting?.price,
            created_date: waiting?.created_date,
            status: waiting?.status
        })
    )

    return (
        <LayoutAdmin>
            <Spin spinning={loading}>
                <TableCustom column={column} data={data} title='đơn hàng chờ xác nhận' />
            </Spin>
            {waitings.length !== 0 && <Paginate totalPage={totalPage} location='right' />}
        </LayoutAdmin>
    );
}

export default AdminWaitingForConfirm;