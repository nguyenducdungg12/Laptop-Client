import axios from 'axios';

function getLocalToken() {
    const token = localStorage.getItem('Authorization');
    return token
}

const AxiosInstance = axios.create({
    baseURL : process.env.REACT_APP_URL,
    headers : {
        'content-type' : 'application/json',
    }
})

AxiosInstance.interceptors.request.use(async (config)=>{
        const token = getLocalToken();
        if(token){
            config.headers.Authorization=token;
        }
        return config;
    },(err)=>{
        return Promise.reject(err);
    }
)
AxiosInstance.interceptors.response.use((response)=>{
    if(response && response.data){
        return response.data;
    }
    return response;
},
    (err)=>{
        throw err;
    }
)
export default AxiosInstance;