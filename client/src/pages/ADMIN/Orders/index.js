import { Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { globalSelector } from "../../../redux/selector";
import { gettAllOrders } from "../../../services/orderService";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import Paginate from "../../../components/Paginate";

const AdminOrderHistory = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const global = useSelector(globalSelector);

    const gettOrders = async () => {
        setLoading(true);
        const res = await gettAllOrders(global.page);
        console.log(res);
        if (res.data) {
            setOrders(res.data.rows);
        }
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await gettAllOrders(global.page);
        if (res.data) {
            setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
        }
        setLoading(false);
    }


    useEffect(() => {
        gettOrders();
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
    ]

    let data = [];
    orders && orders.forEach((waiting, index) =>
        data.push({
            stt: index + 1,
            customerName: waiting?.Customer?.fullname,
            phone: waiting?.phone,
            address: `${waiting?.wards}, ${waiting?.district}, ${waiting?.city}`,
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
                <TableCustom column={column} data={data} title='giao dịch nào' />
            </Spin>
            {orders.length !== 0 && <Paginate totalPage={totalPage} location='right' />}
        </LayoutAdmin>
    );
}

export default AdminOrderHistory;