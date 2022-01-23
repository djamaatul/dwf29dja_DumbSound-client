import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://dwf29dja-dumbsound.herokuapp.com/api/v1/',
});
export const configJson = {
	headers: {
		'Content-type': 'application/json',
	},
};
export const configMulter = {
	headers: {
		'Content-type': 'multipart/form-data',
	},
};

export const setAuthToken = (token) => {
	if (token) {
		API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete API.defaults.headers.comin['Authorization'];
	}
};
