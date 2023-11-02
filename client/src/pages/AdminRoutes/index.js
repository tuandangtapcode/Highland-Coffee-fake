import { useSelector } from 'react-redux';
import { userSelector } from "../../redux/selector";
import ForbiddenPage from '../ErrorPage/ForbiddenPage';
import { Outlet } from 'react-router-dom';


const AdminRoutes = () => {

    const user = useSelector(userSelector);

    return (
        <>
            {
                user.is_login && user.is_admin ?
                    <Outlet />
                    : <ForbiddenPage />
            }
        </>
    );
}

export default AdminRoutes;