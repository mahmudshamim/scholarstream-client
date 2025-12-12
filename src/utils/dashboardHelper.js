import { usersAPI } from '../services/api';

/**
 * Get the appropriate dashboard route based on user role
 * @param {string} userEmail - The email of the logged-in user
 * @returns {Promise<string>} - The dashboard route path
 */
export const getDashboardRoute = async (userEmail) => {
    try {
        const res = await usersAPI.getUserByEmail(userEmail?.toLowerCase());
        console.log('[Dashboard Helper] Role Fetch Response:', res.data);

        const role = res.data?.role; // Safe access

        if (!role) {
            console.warn('[Dashboard Helper] Role is undefined, defaulting to student.');
            return '/dashboard/student';
        }

        if (role.toLowerCase() === 'admin') {
            return '/dashboard/admin';
        } else if (role.toLowerCase() === 'moderator') {
            return '/dashboard/moderator';
        } else {
            return '/dashboard/student';
        }
    } catch (err) {
        console.error('[Dashboard Helper] Role fetch failed:', err);
        return '/dashboard/student'; // Default fallback
    }
};
