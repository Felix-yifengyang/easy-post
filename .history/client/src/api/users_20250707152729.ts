import request from '../utils/request'

export const fetchUserProfile = () => {
    return request.get('/users/profile');
}