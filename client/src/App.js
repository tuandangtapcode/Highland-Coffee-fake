import React from 'react';
import { Spin } from "antd";
import { useRoutes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import jwtdecode from "jwt-decode";
import { getProfileCustomer } from './services/authService';
import userSlice from './redux/userSlice';
import './App.css';
import { getAllCategoriesNotPageinate } from './services/categoryService';
import globalSlice from './redux/globalSlice';

// Admin 
const AdminRoutes = React.lazy(() => import("./pages/AdminRoutes"));
const PublicRoutes = React.lazy(() => import("./pages/PublicRoutes"));
const Overview = React.lazy(() => import("./pages/ADMIN/Overview"));
const AdminCustomers = React.lazy(() => import('./pages/ADMIN/Customers'));
const AdminCategory = React.lazy(() => import("./pages/ADMIN/Categories"));
const AdminDetailCategory = React.lazy(() => import("./pages/ADMIN/Categories/Detail"));
const AdminProduct = React.lazy(() => import('./pages/ADMIN/Products'));
const AdminDetailProduct = React.lazy(() => import('./pages/ADMIN/Products/Detail'));
const AdminWaitingForConfirm = React.lazy(() => import('./pages/ADMIN/WaitingForConfirm'));
const AdminOrderHistory = React.lazy(() => import('./pages/ADMIN/Orders'));

// User
const PrivateRoutes = React.lazy(() => import('./pages/PrivateRoutes'));
const ProfilePage = React.lazy(() => import('./pages/USER/ProfilePage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const ChangePasswordPage = React.lazy(() => import('./pages/ChangePasswordPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const OrderPage = React.lazy(() => import('./pages/USER/OrderPage'));

// Guest
const HomePage = React.lazy(() => import('./pages/Home'));
const ResultProductPage = React.lazy(() => import('./pages/ResultProduct'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SigupPage = React.lazy(() => import('./pages/SingupPage'));
const NotFoundPage = React.lazy(() => import('./pages/ErrorPage/NotFoundPage'));
const AboutUsPage = React.lazy(() => import('./pages/AboutPage'));
const PolicyPage = React.lazy(() => import('./pages/PolicyPage'));
const RefundPage = React.lazy(() => import('./pages/RefundPage'));
const DetailProductPage = React.lazy(() => import('./pages/DetailProductPage'))


function LazyLoadingComponent({ children }) {
    return (
        <React.Suspense
            fallback={
                <div className="loading-center" style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
                    <Spin />
                </div>
            }
        >
            {children}
        </React.Suspense>
    )
}

const App = () => {

    const routes = [

        // ADMIN
        {
            element: (
                <LazyLoadingComponent>
                    <AdminRoutes />
                </LazyLoadingComponent>
            ),
            children: [
                {
                    path: '/admin/tong-quan',
                    element: (
                        <LazyLoadingComponent>
                            <Overview />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/khach-hang',
                    element: (
                        <LazyLoadingComponent>
                            <AdminCustomers />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/loai-san-pham',
                    element: (
                        <LazyLoadingComponent>
                            <AdminCategory />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/loai-san-pham/:slug',
                    element: (
                        <LazyLoadingComponent>
                            <AdminDetailCategory />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/san-pham',
                    element: (
                        <LazyLoadingComponent>
                            <AdminProduct />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/san-pham/:slug',
                    element: (
                        <LazyLoadingComponent>
                            <AdminDetailProduct />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/don-hang-cho-xac-nhan',
                    element: (
                        <LazyLoadingComponent>
                            <AdminWaitingForConfirm />
                        </LazyLoadingComponent>
                    )
                },
                {
                    path: '/admin/lich-su-giao-dich',
                    element: (
                        <LazyLoadingComponent>
                            <AdminOrderHistory />
                        </LazyLoadingComponent>
                    )
                },
            ]
        },

        // USER
        {
            element: (
                <LazyLoadingComponent>
                    <PrivateRoutes />
                </LazyLoadingComponent>
            ),
            children: [
                {
                    path: '/trang-ca-nhan',
                    element: (
                        <LazyLoadingComponent>
                            <ProfilePage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/doi-mat-khau',
                    element: (
                        <LazyLoadingComponent>
                            <ChangePasswordPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/don-hang',
                    element: (
                        <LazyLoadingComponent>
                            <OrderPage />
                        </LazyLoadingComponent>
                    ),
                },
            ]
        },

        // GUEST
        {
            element: (
                <LazyLoadingComponent>
                    <PublicRoutes />
                </LazyLoadingComponent>
            ),
            children: [
                {
                    path: '/',
                    element: (
                        <LazyLoadingComponent>
                            <HomePage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/search',
                    element: (
                        <LazyLoadingComponent>
                            <ResultProductPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/san-pham/:cateSlug',
                    element: (
                        <LazyLoadingComponent>
                            <ResultProductPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/chi-tiet-san-pham/:prodSlug',
                    element: (
                        <LazyLoadingComponent>
                            <DetailProductPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/dang-nhap',
                    element: (
                        <LazyLoadingComponent>
                            <LoginPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/dang-ky',
                    element: (
                        <LazyLoadingComponent>
                            <SigupPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/gioi-thieu',
                    element: (
                        <LazyLoadingComponent>
                            <AboutUsPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/chinh-sach-bao-mat',
                    element: (
                        <LazyLoadingComponent>
                            <PolicyPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/chinh-sach-doi-tra',
                    element: (
                        <LazyLoadingComponent>
                            <RefundPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/gio-hang',
                    element: (
                        <LazyLoadingComponent>
                            <CartPage />
                        </LazyLoadingComponent>
                    ),
                },
                {
                    path: '/checkout',
                    element: (
                        <LazyLoadingComponent>
                            <CheckoutPage />
                        </LazyLoadingComponent>
                    ),
                },
            ]
        },
        {
            path: '*',
            element: (
                <LazyLoadingComponent>
                    <NotFoundPage />
                </LazyLoadingComponent>
            )
        },
        {
            path: '/not-found',
            element: (
                <LazyLoadingComponent>
                    <NotFoundPage />
                </LazyLoadingComponent>
            )
        }
    ]

    const element = useRoutes(routes);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const user = jwtdecode(localStorage.getItem('token'));
            getProfile(user.payload.id);
        }
    }, [])

    useEffect(() => {
        getCategoires();
    }, [])

    const getCategoires = async () => {
        const res = await getAllCategoriesNotPageinate();
        await dispatch(globalSlice.actions.changeCategories(res.data.data))
    }

    const getProfile = async (id) => {
        const res = await getProfileCustomer(id);
        await dispatch(userSlice.actions.updateUser({ ...res.data.data, is_login: true }));
        if (res.data.data.is_admin) {
            navigate('/admin/tong-quan');
        } else {
            navigate('/');
        }
    }

    return (
        <>
            <ToastContainer />
            <div>{element}</div>
        </>
    );
}

export default App;