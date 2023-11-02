import { useState, useEffect } from "react";
import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import TableCustom from "../../../components/Table/TableCustom";
import { Link } from "react-router-dom";
import ModalCreate from "../../../components/ModalCreate";
import { getAllCategories } from "../../../services/categoryService";
import { AutoComplete, Input, Space, Spin } from 'antd';
import { useSelector } from "react-redux";
import { globalSelector } from "../../../redux/selector";
import Paginate from "../../../components/Paginate";


const AdminCategory = () => {

    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const global = useSelector(globalSelector);


    const onDelete = (e) => {

    }

    const column = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt'
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/loai-san-pham/${record?.slug}`}>Chi tiết</Link>
                    <Link onClick={(e) => onDelete(e)}>Xóa</Link>
                </Space>
            ),
        }
    ]

    let data = [];
    categories && categories.forEach((cate, index) =>
        data.push({
            stt: index + 1,
            name: cate?.name,
            slug: cate?.slug
        })
    )

    useEffect(() => {
        getCategories();
    }, [keyword, global.page])

    useEffect(() => { 
        getTotalPage();
    }, [keyword])

    const getCategories = async () => {
        setLoading(true);
        const res = await getAllCategories({ page: global.page, keyword });
        if (res.data) {
            setCategories(res.data.rows);
        }
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await getAllCategories({ page: global.page, keyword });
        if (res.data) {
            setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
        }
        setLoading(false);
    }


    return (
        <LayoutAdmin>
            <ModalCreate type='loại sản phẩm' getCategories={getCategories} getTotalPageCategories={getTotalPage} />
            <AutoComplete
                popupClassName="certain-category-search-dropdown"
                style={{
                    width: '90%',
                    marginBottom: '12px'
                }}
            >
                <Input.Search
                    onSearch={(e) => setKeyword(e)}
                    size="large" />
            </AutoComplete>
            <Spin spinning={loading}>
                <TableCustom
                    column={column}
                    data={data}
                    title='loại sản phẩm'
                />
            </Spin>
            {categories.length !== 0 && <Paginate totalPage={totalPage} location='right' />}
        </LayoutAdmin>
    );
}

export default AdminCategory;