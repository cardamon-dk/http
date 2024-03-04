// shared/utils/axiosWrapper.js
import axios from 'axios';

class AxiosWrapper {
    constructor(options = {}) {
        // 创建 Axios 实例
        this.instance = axios.create({
            baseURL: options.baseURL || '', // 设置基本的请求URL，根据实际需求修改
            timeout: options.timeout || 10000, // 设置请求超时时间，根据实际需求修改
            headers: options.headers || {
                'Content-Type': 'application/json' // 设置默认的请求头，根据实际需求修改
                // 可以添加其他默认的请求头信息
            }
        });

        // 请求拦截器
        this.instance.interceptors.request.use(config => {
            // 在请求发送之前做些什么，比如加入 token 等
            // 如果不需要在请求前做任何操作，可以直接返回 config
            if (options.requestInterceptor) {
                return options.requestInterceptor(config);
            }
            return config;
        }, error => {
            // 对请求错误做些什么，比如处理错误信息
            return Promise.reject(error);
        });

        // 响应拦截器
        this.instance.interceptors.response.use(response => {
            // 对响应数据做些什么，比如处理成功状态码
            if (options.responseInterceptor) {
                return options.responseInterceptor(response.data);
            }
            return response.data;
        }, error => {
            // 对响应错误做些什么，比如处理错误状态码
            return Promise.reject(error);
        });
    }

    /**
     * 发起 Axios 请求
     * @param {string} method - 请求方法 (GET, POST, PUT, DELETE 等)
     * @param {string} url - 请求的 URL
     * @param {object} data - 请求数据 (仅在 POST 和 PUT 请求中使用)
     * @returns {Promise} - 返回 Axios 请求的 Promise 对象
     */
    request(method, url, data = null) {
        return this.instance({
            method,
            url,
            data
        });
    }
}

export default AxiosWrapper;