import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            // console.log('request stopped by interceptors', token);
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Add 401/403 response interceptor
        axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response ? error.response.status : null;
            // console.log('status error in interceptor', status);
            if (status === 401 || status === 403) {
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        });
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
