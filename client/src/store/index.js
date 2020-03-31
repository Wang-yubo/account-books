import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//* 定义要保存的状态:token,用户信息
const types = {
    //* 是否验证
    SET_IS_AUTHENTICATED: "SET_IS_AUTHENTICATED",
    SET_USER: "SET_USER"

}


//* 定义状态
const state = {
    isAutenticated: false, //* 默认没有被验证
    user: {}, //* 存储用户信息
};
//* 获取状态
const getters = {
    isAutenticated: state => state.isAutenticated,
    user: state => state.user

};
//* 修改状态
const mutations = {
    [types.SET_IS_AUTHENTICATED](state, isAutenticated) {
        if (isAutenticated) {
            state.isAutenticated = true
        } else {
            state.isAutenticated = false
        }
    },
    [types.SET_USER](state, user) {
        if (user) {
            state.user = user
        } else {
            state.user = {}
        }
    },
};
//* 定义认证回调
const actions = {
    setIsAuthenticated: ({
        commit
    }, isAutenticated) => {
        commit(types.SET_IS_AUTHENTICATED, isAutenticated)
    },
    setUser: ({
        commit
    }, user) => {
        commit(types.SET_USER, user)
    },
    //* 定义清除认证回调
    clearCurrentState: ({
        commit
    }, isAutenticated) => {
        commit(types.SET_IS_AUTHENTICATED, false),
            commit(types.SET_USER, null)
    },
};




//* 派发


export default new Vuex.Store({
    //* 把这些对象单例出去
    state,
    getters,
    mutations,
    actions,

})