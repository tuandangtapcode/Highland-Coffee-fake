import { useEffect, useState } from "react";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import { getAllCustomer } from "../../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalSelector } from '../../../redux/selector';
import { AutoComplete, Input, Spin } from "antd";
import Paginate from "../../../components/Paginate";


const AdminCustomers = () => {


    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const loacation = useLocation();
    const keyword = loacation.search.split('=')[1];
    const navigate = useNavigate();
    const global = useSelector(globalSelector);

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            key: 'fullname'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
    ]

    let data = [];

    customers && customers.forEach((customer, index) =>
        data.push({
            key: index,
            STT: index,
            fullname: customer?.fullname,
            email: customer?.email
        })
    )

    useEffect(() => {
        getCustomers();
    }, [keyword])

    useEffect(() => {
        getTotalPage();
    }, [])

    const getCustomers = async () => {
        setLoading(true);
        const res = await getAllCustomer({ keyword, page: global.page });
        if (res.data) {
            setCustomers(res.data.rows);
        }
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await getAllCustomer({ keyword, page: global.page });
        if (res.data) {
            setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
        }
        setLoading(false);
    }

    return (
        <LayoutAdmin>

            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                style={{
                    width: '90%',
                    marginBottom: '12px'
                }}
            >
                <Input.Search
                    onSearch={(e) => navigate(`/search?query=${e}`)}
                    size="large" />
            </AutoComplete>
            <Spin spinning={loading}>
                <TableCustom column={column} data={data} title='khách hàng' />
            </Spin>
            {customers.length !== 0 && <Paginate totalPage={totalPage} location='right' />}    
        </LayoutAdmin>
    );
}

export default AdminCustomers;