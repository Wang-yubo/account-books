import axios from 'axios'
import { Loading, Message } from 'element-ui'

let loading;
//* 设置加载开始
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '你的对象正在派送中。。。',
        background: 'rgba( 0, 0, 0, 0.5 )'
    })
}
//* 设置加载结束
function endLoading() {
    loading.close()
}
//* 请求拦截
axios.interceptors.request.use(config => {
    startLoading();
    //* 添加请求头
    if (localStorage.eleToken) {
        config.headers.Authorization = localStorage.eleToken
    }
    return config;
}, err => {
    return Promise.reject(err);
});

//* 响应拦截
axios.interceptors.response.use(response => {
    endLoading();
    return response;
}, error => {
    //* 这里使用了elementui的Message模块
    //* 根据返回的错误信息解构状态码
    const { status } = error.response
        //* 根据状态码发送不同的错误信息
    if (status === 401) {
        Message.error("亲爱的主人,您的身份认证已过期,请重新登陆~")
    }

    Message.error(error.response.data);
    endLoading();
    return Promise.reject(error);
})
export default axios;