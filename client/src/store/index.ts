import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthService from "@/services/auth-service";
import ResponseUtils from "@/utils/response-utils";
import WebsiteUtils from "@/utils/website-utils";
import UserService from "@/services/user-service";
import {LoginRequest} from "@/interfaces/login-request";
import {RegisterRequest} from "@/interfaces/register-request";
import {AxiosResponse} from "axios";
import {Account} from "@/interfaces/account";
import {Settings} from "@/interfaces/settings";

Vue.use(Vuex);

let response: AxiosResponse;

const store = new Vuex.Store({
    plugins: [createPersistedState({storage: window.sessionStorage})],
    state: {
        acceptedTermsAndConditions: null,
        account: null,
        country: null,
        email: null,
        firstName: null,
        isLoggedIn: false,
        lastLogin: null,
        lastName: null,
        page: "DashboardSummary",
        settings: null,
    },
    mutations: {
        auth_success(state) {
            state.isLoggedIn = true;
        },
        async auth_logout(state) {
            state.account = null;
            state.acceptedTermsAndConditions = null;
            state.email = null;
            state.isLoggedIn = false;
            state.lastLogin = null;
            state.page = "DashboardSummary";
            state.settings = null;
        },
        async setAcceptedTermsAndConditions(state, accepted: boolean) {
            state.acceptedTermsAndConditions = accepted;
        },
        async setAccount(state, account: Account) {
            state.account = account;
        },
        async setEmail(state, email: string) {
            state.email = email;
        },
        async setLastLogin(state, lastLogin: number) {
            state.lastLogin = new Date(lastLogin);
        },
        async setPage(state, page: string) {
            state.page = page;
        },
        async setSettings(state, settings: Settings) {
            state.settings = settings;
        },
    },
    actions: {
        async getAccount({commit}): Promise<void> {
            response = await UserService.getAccount();

            commit('setAccount', response.data.account)
        },
        async getPage({commit, state}, path: string): Promise<void> {
            switch (path) {
                case "/dashboard/user/settings":
                    commit("setPage", "Settings");
                    break;
                case "/dashboard/account/summary":
                    commit("setPage", "Summary");
                    break;
                case "/dashboard/account/paybills":
                    commit("setPage", "PayBills");
                    break;
                case "/dashboard/etransfers":
                    commit("setPage", "Etransfers");
                    break;
                case "/dashboard/info":
                    commit("setPage", "Info");
                    break;
                case "/dashboard/view":
                    commit("setPage", "DashboardSummary");
                    break;
            }
            WebsiteUtils.updatePageTitle(state.page);
        },
        async getRefreshToken(): Promise<boolean> {
            return ResponseUtils.successProcessor(
                await AuthService.getRefreshToken()
            );
        },
        async getSettings({commit}): Promise<void> {
            response = await UserService.getSettings();

            commit("setSettings", response.data.settings);
        },
        async login({commit}, user: LoginRequest): Promise<void> {
            response = await AuthService.login(user);
            if (ResponseUtils.successAuthProcessor(response)) {
                const data = response.data;

                await commit("auth_success");
                commit(
                    "setAcceptedTermsAndConditions",
                    data.acceptedTermsAndConditions
                );
                commit("setEmail", data.email);
                commit("setLastLogin", data.lastLogin);

                if (data.acceptedTermsAndConditions) {
                    await WebsiteUtils.switchVue("dashboard");
                } else {
                    await WebsiteUtils.switchVue("firstTimeLogin");
                }
            }
        },
        async logout(): Promise<void> {
            await AuthService.logout();
        },
        async register({commit}, user: RegisterRequest): Promise<boolean> {
            return ResponseUtils.successAuthProcessor(await AuthService.register(user))
        },
        async saveSettings({commit}, settings: Settings): Promise<boolean> {
            UserService.updateSettings(settings);
        }
    },
    modules: {},
    getters: {
        acceptedTermsAndConditions: (state) => state.acceptedTermsAndConditions,
        account: (state) => state.account,
        country: (state) => state.country,
        email: (state) => state.email,
        firstName: (state) => state.firstName,
        isLoggedIn: (state) => state.isLoggedIn,
        lastLogin: (state) => state.lastLogin,
        lastName: (state) => state.lastName,
        page: (state) => state.page,
        settings: (state) => state.settings,
    },
});

export default store;
