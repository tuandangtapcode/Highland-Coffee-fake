import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selector';

const Profile = () => {

    const user = useSelector(userSelector);

    return (
        <>
            <p style={{marginBottom:'50px', fontSize:'25px'}}>Thông tin tài khoản</p>
            <div>
                <p style={{marginBottom:'20px'}}><span style={{fontWeight:'bold', fontSize:'15px'}}>Họ tên:   </span>{user.name}</p>
            </div>
            <div>
                <p><span style={{fontWeight:'bold', fontSize:'15px'}}>Email:   </span>{user.email}</p>
            </div>
        </>
    );
}

export default Profile;