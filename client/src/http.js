import axios from 'axios'
import { Loading, Message } from 'element-ui'
let loading;



//   请求拦截
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '你的对象正在派送中。。。',
        background: 'rgba( 0, 0, 0, 0.5 )'
    })
}

function endLoading() {
    loading.close()
}

axios.interceptors.request.use(config => {

    startLoading();
    return config;

}, err => {
    return Promise.reject(err);
});

//    响应拦截

axios.interceptors.response.use(response => {

    endLoading();

    return response;

}, error => {

    Message.error(error.response.data);
    endLoading();

    return Promise.reject(error);

})



export default axios;