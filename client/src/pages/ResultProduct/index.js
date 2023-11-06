import LayoutUser from "../../components/Layouts/LayoutUser";
import ListProducts from "../../components/ListProducts";
import SliderCustom from "../../components/Slider";
import slider_2 from "../../assets/images/slider_2.png";
import slider_3 from "../../assets/images/slider_3.png";
import slider_4 from "../../assets/images/slider_4.png";

import { ArrowDownOutlined } from '@ant-design/icons';

import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { globalSelector } from '../../redux/selector'
import { getAllProductsLimit } from '../../services/productService';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Select, Spin } from "antd";
import BreadCrumbCustom from "../../components/MyBreadCrumb/BreadCrumbCustom";
import Paginate from "../../components/Paginate";
import { TextResultProduct } from './styled'


const ResultProductPage = () => {

    const global = useSelector(globalSelector);

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [sort, setSort] = useState();
    const [type, setType] = useState();
    const [totalProduct, setTotalProduct] = useState();
    const [loading, setLoading] = useState(false);
    const { cateSlug } = useParams();
    const loacation = useLocation();
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    useEffect(() => {
        setLoading(true);
        const getProductsLimit = async () => {
            const res = await getAllProductsLimit({ page: global.page, cateSlug, keyword: query, sort, type });
            console.log(res);
            if (!res.data) navigate('/not-found');
            setProducts(res.data.rows);
        }
        getProductsLimit();
        setLoading(false);
    }, [cateSlug, query, global.page, sort, type])

    useEffect(() => {
        setLoading(true);
        const getTotoalPage = async () => {
            const res = await getAllProductsLimit({ page: global.page, cateSlug, keyword: query });
            if (cateSlug || query) {
                if (res.data) {
                    setTotalProduct(res.data.count)
                    setTotalPage(Math.ceil(res.data.count / res.data.rows.length));
                }
            }
        }
        getTotoalPage();
        setLoading(false);
    }, [cateSlug, query, sort, type])

    const handleFilter = (e) => {
        if (e === 'Mặc định') {
            setSort();
            setType();
            return;
        }
        const filterKey = e.split(',');
        setSort(filterKey[0]);
        setType(filterKey[1]);
    }


    return (
        <LayoutUser>
            {loacation.pathname.includes('search') && <BreadCrumbCustom title='Kết quả tìm kiếm' />}
            {
                global.categories.map(cate =>
                    cate.slug === cateSlug ? <BreadCrumbCustom title={cate.name} /> : <></>
                )
            }

            <div style={{ display: loacation.pathname.includes('search') ? 'none' : 'block' }}>
                <SliderCustom dots={false} slidesToShow={1} arrows={false} autoplay={true} slidesToScroll={1}>
                    <div>
                        <img style={{ maxHeight: '280px', margin: 'auto', width: '100%' }} src={slider_2} alt="" />
                    </div>
                    <div>
                        <img style={{ maxHeight: '280px', margin: 'auto', width: '100%' }} src={slider_3} alt="" />
                    </div>
                    <div>
                        <img style={{ maxHeight: '280px', margin: 'auto', width: '100%' }} src={slider_4} alt="" />
                    </div>
                </SliderCustom>
            </div>


            {query && totalProduct !== 0 && <TextResultProduct>CÓ {totalProduct} KẾT QUẢ TÌM KIẾM PHÙ HỢP</TextResultProduct>}
            {query && totalProduct === 0 && <TextResultProduct>KHÔNG CÓ KẾT QUẢ TÌM KIẾM PHÙ HỢP</TextResultProduct>}

            {
                !loacation.pathname.includes('search') && global.categories.map(cate =>
                    cate.slug === cateSlug ? <TextResultProduct>{cate.name} {`( ${totalProduct} sản phẩm)`}</TextResultProduct> : <></>
                )
            }

            <span style={{ color: '#777' }}><ArrowDownOutlined />Sắp xếp: </span>
            <Select
                onChange={handleFilter}
                style={{ width: '200px' }}
                defaultValue='Mặc định'
                options={[
                    {
                        value: 'Mặc định',
                        label: 'Mặc định',
                    },
                    {
                        value: `name,asc`,
                        label: 'A đến Z',
                    },
                    {
                        value: `name,desc`,
                        label: 'Z đến A',
                    },
                    {
                        value: `price,asc`,
                        label: 'Giá tăng dần',
                    },
                    {
                        value: `price,desc`,
                        label: 'Giá giảm dần',
                    },
                    {
                        value: `createdAt,asc`,
                        label: 'Hàng mới nhất',
                    },
                    {
                        value: `createdAt,desc`,
                        label: 'Hàng cũ nhất',
                    },
                ]}
            />


            <Spin spinning={loading}>
                <ListProducts products={products} />
            </Spin>

            {products.length !== 0 && <Paginate totalPage={totalPage} location='center' />}
        </LayoutUser >
    );
}

export default ResultProductPage;