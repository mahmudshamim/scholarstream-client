import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiPublic = axios.create({
    baseURL: API_URL
});

export const apiSecure = axios.create({
    baseURL: API_URL
});

// Request Interceptor
apiSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor
apiSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
            localStorage.removeItem('access-token');
            // Basic redirect for non-hook service
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export const scholarshipsAPI = {
    getAll: (params) => {
        return apiPublic.get('/scholarships', { params });
    },

    getTop: () => apiPublic.get('/scholarships/top'),
    getById: (id) => apiPublic.get(`/scholarships/${id}`),
};

export const authAPI = {
    registerUser: (data) => apiPublic.post('/users', data), // User creation is usually public or secure? '/users' POST in userRoutes is public?
    // userRoutes.js: router.post('/users', userController.createOrUpdateUser); -> This seems public or at least accessible during login/register for syncing.

    // getUser: (email) => apiSecure.get(`/users/${email}`), // userRoutes: router.get('/users/:email', verifyToken, ...)
};

export const applicationsAPI = {
    submitApplication: (data) => apiSecure.post('/applications', data),
    getUserApplications: (email) => apiSecure.get(`/applications/user/${email}`),
    getAllApplications: () => apiSecure.get('/applications'),
    getApplicationById: (id) => apiSecure.get(`/applications/${id}`),
    updateApplication: (id, data) => apiSecure.put(`/applications/${id}`, data),
    deleteApplication: (id) => apiSecure.delete(`/applications/${id}`),
    updateStatus: (id, status) => apiSecure.patch(`/applications/status/${id}`, { status }),
    addFeedback: (id, feedback) => apiSecure.patch(`/applications/feedback/${id}`, { feedback }),
    createPaymentIntent: (price) => apiSecure.post('/create-payment-intent', { price }),
};

export const reviewsAPI = {
    addReview: (data) => apiSecure.post('/reviews', data),
    getScholarshipReviews: (scholarshipId) => apiPublic.get(`/reviews/${scholarshipId}`),
    getUserReviews: (email) => apiSecure.get(`/reviews/user/${email}`),
    getAllReviews: () => apiSecure.get('/all-reviews'),
    updateReview: (id, data) => apiSecure.put(`/reviews/${id}`, data),
    deleteReview: (id) => apiSecure.delete(`/reviews/${id}`)
};

export const usersAPI = {
    createOrUpdateUser: (data) => apiPublic.post('/users', data),
    getAllUsers: () => apiSecure.get('/users'),
    getUserByEmail: (email) => apiSecure.get(`/users/${email}`),
    updateUserRole: (id, role) => apiSecure.patch(`/users/role/${id}`, { role }),
    deleteUser: (id) => apiSecure.delete(`/users/${id}`)
};

export const analyticsAPI = {
    getStats: () => apiSecure.get('/analytics')
};
