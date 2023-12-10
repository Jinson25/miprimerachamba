import axios from "axios";

export const getUsers = () => 
localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user'))
: null;

export const login = async (email, password) => {
    const { data } = await axios.post('api/v1/users/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}
export const register = async registerData => {
    const { data } = await axios.post('api/v1/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}
export const updateProfile = async updateData => {
    const { data } = await axios.put('api/v1/users/updateProfile', updateData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

export const logout = () => {
    localStorage.removeItem('user');
}
