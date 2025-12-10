import { usersAPI } from '../services/api';

/**
 * Get the appropriate dashboard route based on user role
 * @param {string} userEmail - The email of the logged-in user
 * @returns {Promise<string>} - The dashboard route path
 */
export const getDashboardRoute = async (userEmail) => {
    try {
        const res = await usersAPI.getUserByEmail(userEmail);
        const role = res.data.role;

        if (role === 'Admin') {
            return '/dashboard/admin';
        } else if (role === 'Moderator') {
            return '/dashboard/moderator';
        } else {
            return '/dashboard/student';
        }
    } catch (err) {
        console.error('Role fetch failed', err);
        return '/dashboard/student'; // Default fallback
    }
};
