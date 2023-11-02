import { Badge, Col, Row } from "antd";


const CheckoutItem = ({ item }) => {
    return (
        <Row justify='space-between'>
            <Col xl={3} lg={3} md={3} sm={3} xs={3} >
                <Badge count={item?.quantity}>
                    <img style={{ width: '60px', height: '60px' }} src={`http://localhost:5000/${item?.image}`} alt='' />
                </Badge>
            </Col>

            <Col xl={15} lg={15} md={15} sm={15} xs={15} style={{ alignSelf: 'center' }}>
                <span>{item?.name}</span>
            </Col>

            <Col xl={2} lg={2} md={2} sm={2} xs={2} style={{ alignSelf: 'center' }}>
                <span>{item?.price?.toFixed()}.000đ</span>
            </Col>
        </Row>
    );
}

export default CheckoutItem;