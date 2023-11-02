import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../redux/userSlice';
import { userSelector } from '../../redux/selector';
import { MenuUser } from './styled'

const itemsForUser = [
    {
        key: '/trang-ca-nhan',
        label: 'Thông tin tài khoản'
    },
    {
        key: '/don-hang',
        label: 'Đơn hàng của bạn'
    },
    {
        key: '/doi-mat-khau',
        label: 'Đổi mật khẩu'
    },
    {
        key: '/dang-xuat',
        label: 'Đăng xuất'
    }
]

const itemsForAdmin = [
    {
        key: '/admin/tong-quan',
        label: 'Tổng quan'
    },
    {
        key: '/admin/khach-hang',
        label: 'Khách hàng'
    },
    {
        key: '/admin/loai-san-pham',
        label: 'Loại sản phẩm'
    },
    {
        key: '/admin/san-pham',
        label: 'Sản phẩm'
    },
    {
        key: '/admin/lich-su-giao-dich',
        label: 'Lịch sử giao dịch'
    },
    {
        key: '/admin/don-hang-cho-xac-nhan',
        label: 'Đơn hàng chờ xác nhận'
    },
]

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(userSelector);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(userSlice.actions.resetUser());
        navigate('/dang-nhap');
    }

    const handleMenu = (e) => {
        console.log(e);
        if (e.key === '/dang-xuat') {
            handleLogout();
        } else {
            navigate(e.key);
        }
    }

    return (
        <>
            {
                user.is_admin ? <Menu
                    defaultSelectedKeys={location.pathname}
                    items={itemsForAdmin}
                    onClick={(e) => navigate(e.key)}
                    style={{
                        width: 256,
                    }}
                /> :
                    <>
                        <div style={{ marginBottom: '20px' }}>
                            <p style={{ fontSize: '25px', marginBottom: '3px' }}>Trang cá nhân</p>
                            <h3>Xin chào, {user.name}!</h3>
                        </div>
                        <MenuUser
                            style={{ backgroundColor: 'transparent' }}
                            defaultSelectedKeys={location.pathname}
                            items={itemsForUser}
                            onClick={(e) => handleMenu(e)}
                        />
                    </>
            }
        </>
    );
}

export default SideBar;

