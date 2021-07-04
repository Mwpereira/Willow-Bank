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
        async auth_success(state) {
            state.hasAccessToken = true;
        },
        async auth_logout(state) {
            state.email = null;
            state.hasAccessToken = false;
            state.lastLogin = null;
        },
        async setAcceptedTermsAndConditions(state, accepted: boolean) {
            state.acceptedTermsAndConditions = accepted;
        },
        async setEmail(state, email: string) {
            state.email = email;
        },
        async setLastLogin(state, lastLogin) {
            state.lastLogin = new Date(lastLogin);
        },
        async setPage(state, page: string) {
            state.page = page;
        }
    },
    actions: {
        async getPage({commit, state}, path: string): void {
            switch(path) {
                case '/dashboard/user/settings':
                    state.page = 'Settings';
                    break;
                case '/dashboard/account/summary':
                    state.page = 'Account';
                    break;
                case '/dashboard/etransfers':
                    state.page = 'Etransfers';
                    break;
                default:
                    state.page = 'Summary';
            }
            console.log(path)
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
