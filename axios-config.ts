import axios from 'axios';
const axiosConfig = axios.create({
    baseURL: 'https://vixol72czg.execute-api.us-east-1.amazonaws.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyM2JmNjJkMjZmZjMzNjM0NWYxN2UiLCJpYXQiOjE3Mjk1ODgwODl9.oZgPmU2hcGLNcrLoCUgKEgfzltijlnEP8Ep3KhTkpDc'
    },
});

export default axiosConfig;
