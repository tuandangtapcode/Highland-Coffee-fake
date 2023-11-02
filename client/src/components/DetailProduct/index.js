import { Divider, Spin } from 'antd';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getByCategoryId, getDetailProduct } from "../../services/productService";
import { DatailContainer, Image, ProductDetail, ProductImage, Details, ProductName, ProductPrice, ProductDes, ATCart, Name, ChangeQuantity, ButtonAdd, Asc, Desc, Quantity, DesHead, RelatedProductTitle, OldPrice, TextPrice } from './styled';
import ProductItem from '../ListProducts/ProductItem';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../services/cartService';
import globalSlice from '../../redux/globalSlice';
import { globalSelector } from '../../redux/selector';
import Comments from './Comments';
import socket from '../../utils/socket';
import { getAllComment } from '../../services/commentService';
import SliderCustom from '../Slider';
import BreadCrumbCustom from '../MyBreadCrumb/BreadCrumbCustom';


const DetailProduct = () => {


    const { prodSlug } = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const global = useSelector(globalSelector);

    const navigate = useNavigate();

    const [comments, setComments] = useState([]);

    const getProduct = async () => {
        try {
            setLoading(true);
            const resDetail = await getDetailProduct(prodSlug);
            if (resDetail.data.isError) {
                navigate('/not-found');
                return;
            }
            const resRelated = await getByCategoryId(resDetail.data.data.category_id);
            const resComment = await getAllComment(resDetail.data.data.id);
            setComments(resComment.data);
            setProduct(resDetail.data.data);
            setRelatedProducts(resRelated.data.data.filter(p => p.slug !== prodSlug));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProduct();
    }, [prodSlug]);


    useEffect(() => {
        socket.on('get-comments', function (data) {
            setComments([...comments, data]);
        })
    }, [comments])



    const handleAddToCart = async () => {
        const data = {
            product_id: product.id,
            quantity: count,
            price: product.discount ? (product.price - (product.price * (product.discount / 100)).toFixed()) * count : product.price * count,
            image: product.image,
            name: product.name
        }
        const res = await addToCart(data);
        dispatch(globalSlice.actions.changeRerender(!global.reRender));
    }


    const [count, setCount] = useState(1)

    const handleAsc = () => {
        setCount(prev => prev + 1)
    }
    const handleDesc = () => {
        if (count > 1) {
            setCount(prev => prev - 1)
        }
    }

    return (
        <>
            <DatailContainer>
                <BreadCrumbCustom title={`${product?.name}`} />
                <Spin spinning={loading}>
                    <ProductDetail>
                        <Image>
                            <ProductImage src={`http://localhost:5000/${product?.image}`} alt='product_image' />
                        </Image>
                        <Details>
                            <ProductName>
                                <Name>{product?.name}</Name>
                            </ProductName>
                            <Divider style={{ marginTop: '5px' }} />

                            {
                                product?.discount !== 0 ?
                                    <>
                                        <ProductPrice>
                                            {product?.price - (product?.price * (product?.discount / 100))?.toFixed()}.000đ
                                        </ProductPrice>
                                        <TextPrice>Giá gốc: <OldPrice>{product?.price}.000đ</OldPrice></TextPrice>
                                        <TextPrice>Tiết kiệm: {(product?.price * (product?.discount / 100))?.toFixed()}.000đ</TextPrice>
                                    </>
                                    :
                                    <ProductPrice>
                                        {product?.price}.000đ
                                    </ProductPrice>
                            }
                            <Divider style={{ marginTop: '5px' }} />

                            <ATCart>
                                <ChangeQuantity>
                                    <Desc onClick={handleDesc}> - </Desc>
                                    <Quantity> {count} </Quantity>
                                    <Asc onClick={handleAsc}> + </Asc>
                                </ChangeQuantity>
                                <ButtonAdd onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</ButtonAdd>
                            </ATCart>
                            <Divider style={{ marginTop: '5px' }} />

                            <ProductDes>
                                <DesHead> Mô tả sản phẩm:</DesHead>
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    {product?.description}
                                </div>
                            </ProductDes>
                        </Details>
                    </ProductDetail>

                    {
                        comments.length !== 0 ?
                            <div style={{ margin: '50px 0' }}>
                                <h2>Đánh giá sản phẩm</h2>
                                <Comments comments={comments} />
                            </div>
                            : <></>
                    }

                    <div style={{ marginTop: '80px' }}>
                        <RelatedProductTitle>
                            <h2>Sản phẩm liên quan</h2>
                        </RelatedProductTitle>
                        <SliderCustom dots={false} slidesToShow={3} arrows={true} autoplay={false} slidesToScroll={1}>
                            {
                                relatedProducts.map(p =>
                                    <ProductItem productItem={p} />
                                )
                            }
                        </SliderCustom>
                    </div>
                </Spin>

            </DatailContainer>
        </>
    );
};

export default DetailProduct;
