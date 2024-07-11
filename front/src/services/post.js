import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { getDefaultToken } from './service';

const token = localStorage.getItem('token');

export const postData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const postRegister = async (data) => {
  try {
    let response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

export const loginPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
  }
};

<<<<<<< HEAD
export const postCategory = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save category ${error.message}`);
=======
export const recipePost = async (categoryId, data) => {
  try {
    const userToken = getDefaultToken();
    const response = await axios.post(`${API_URL}/api/categories/${categoryId}/recipes`, data, {
      headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to save data ${error.message}`);
>>>>>>> b0a4959a092374378f24aafafb352426d9fa1a0e
  }
};
