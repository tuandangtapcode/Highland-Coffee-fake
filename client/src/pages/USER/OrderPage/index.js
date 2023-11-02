import Order from "../../../components/Order";
import DasboardUser from "../Dashboard";



const OrderPage = () => {
    return (
        <DasboardUser title='Đơn hàng'>
            <Order />
        </DasboardUser>
    );
}

export default OrderPage;