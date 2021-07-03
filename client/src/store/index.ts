import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        acceptedTermsAndConditions: null,
        email: null,
        hasAccessToken: false,
        lastLogin: null,
    },
    mutations: {
        auth_success(state) {
            state.hasAccessToken = true;
        },
        auth_logout(state) {
            state.email = null;
            state.hasAccessToken = false;
            state.lastLogin = null;
        },
        setAcceptedTermsAndConditions(state, accepted) {
            state.acceptedTermsAndConditions = accepted;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setLastLogin(state, lastLogin) {
            state.lastLogin = new Date(lastLogin);
        },
    },
    actions: {
    },
    modules: {},
    getters: {
        acceptedTermsAndConditions: (state) => state.acceptedTermsAndConditions,
        email: (state) => state.email,
        isLoggedIn: (state) => state.hasAccessToken,
        lastLogin: (state) => state.lastLogin,
    }
});

export default store;
