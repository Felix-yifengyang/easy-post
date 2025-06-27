import API from './client';

export const fetchUserProfile = () => {
    return API.get('/users/profile');
}