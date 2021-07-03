import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        acceptedTermsAndConditions: null,
        account: null,
        email: null,
        hasAccessToken: false,
        lastLogin: null,
        page: 'summary'
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
        setAcceptedTermsAndConditions(state, accepted: boolean) {
            state.acceptedTermsAndConditions = accepted;
        },
        setEmail(state, email: string) {
            state.email = email;
        },
        setLastLogin(state, lastLogin) {
            state.lastLogin = new Date(lastLogin);
        },
        setPage(state, page: string) {
            state.page = page;
        }
    },
    actions: {
        getPage({commit, state}, path: string): void {
            switch(path) {
                case '/dashboard/user/settings':
                    state.page = 'settings';
            }
        }
    },
    modules: {},
    getters: {
        acceptedTermsAndConditions: (state) => state.acceptedTermsAndConditions,
        account: (state) => state.account,
        email: (state) => state.email,
        isLoggedIn: (state) => state.hasAccessToken,
        lastLogin: (state) => state.lastLogin,
        page: (state) => state.page,
    }
});

export default store;
