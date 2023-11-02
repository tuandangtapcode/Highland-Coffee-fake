import { AutoComplete, Input, Space, Spin } from 'antd';

import LayoutAdmin from "../../../components/Layouts/LayoutAdmin";
import ModalCreate from "../../../components/ModalCreate";
import TableCustom from '../../../components/Table/TableCustom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalSelector } from '../../../redux/selector';
import { Link } from 'react-router-dom';
import { getAllProductsAdmin } from '../../../services/productService';
import Paginate from '../../../components/Paginate';

const AdminProduct = () => {

    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const global = useSelector(globalSelector);


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
            title: 'Loại sản phẩm',
            dataIndex: 'categoryName',
            key: 'categoryName'
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
            title: 'Giá',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Số lương',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size='middle'>
                    <Link to={`/admin/san-pham/${record?.slug}`}>Chi tiết</Link>
                    <Link>Xóa</Link>
                </Space>
            ),
        }
    ]

    let data = [];
    products && products.forEach((product, index) =>
        data.push({
            stt: index + 1,
            name: product?.name,
            categoryName: product?.Category?.categoryName,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
            quantity: product?.quantity,
            slug: product?.slug
        })
    )

    const getProducts = async () => {
        setLoading(true);
        const res = await getAllProductsAdmin({ page: global.page, keyword: keyword });
        if (res.data) {
            setProducts(res.data.rows);
        }
        setLoading(false);
    }

    const getTotalPage = async () => {
        setLoading(true);
        const res = await getAllProductsAdmin({ page: global.page, keyword });
        if (res.data) {
            setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
        }
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [keyword, global.page])


    useEffect(() => {
        getTotalPage();
    }, [keyword, totalPage])



    return (
        <LayoutAdmin>
            <ModalCreate type='sản phẩm' getProducts={getProducts} getTotalPageProduct={getTotalPage} />
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
                    title='sản phẩm'
                />
            </Spin>
            {products.length !== 0 && <Paginate totalPage={totalPage} location='right' />}
        </LayoutAdmin>
    );
}

export default AdminProduct;