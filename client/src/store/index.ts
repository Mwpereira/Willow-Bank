import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthService from "@/services/auth-service";
import ResponseUtils from "@/utils/response-utils";
import WebsiteUtils from "@/utils/website-utils";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    acceptedTermsAndConditions: null,
    account: null,
    email: null,
    lastLogin: null,
    page: "DashboardSummary",
  },
  mutations: {
    async auth_logout(state) {
      state.acceptedTermsAndConditions = null;
      state.email = null;
      state.lastLogin = null;
      state.page = "DashboardSummary";
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
    },
  },
  actions: {
    async getPage({ commit, state }, path: string): Promise<void> {
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
  },
  modules: {},
  getters: {
    acceptedTermsAndConditions: (state) => state.acceptedTermsAndConditions,
    account: (state) => state.account,
    email: (state) => state.email,
    lastLogin: (state) => state.lastLogin,
    page: (state) => state.page,
  },
});

export default store;
