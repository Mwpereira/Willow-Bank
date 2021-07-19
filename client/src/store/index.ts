import {Account} from '@/interfaces/account';
import {LoginRequest} from '@/interfaces/login-request';
import {RegisterRequest} from '@/interfaces/register-request';
import {Settings} from '@/interfaces/settings';
import AuthService from '@/services/auth-service';
import BuefyService from '@/services/buefy-service';
import UserService from '@/services/user-service';
import ResponseUtils from '@/utils/response-utils';
import WebsiteUtils from '@/utils/website-utils';
import {AxiosResponse} from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
    page: 'DashboardSummary',
    settings: null,
    twoFactorAuthenticationEnabled: null,
  },
  mutations: {
    auth_success(state) {
      state.isLoggedIn = true;
    },
    auth_logout(state) {
      state.account = null;
      state.acceptedTermsAndConditions = null;
      state.email = null;
      state.isLoggedIn = false;
      state.lastLogin = null;
      state.page = 'DashboardSummary';
      state.settings = null;
      state.twoFactorAuthenticationEnabled = null;
    },
    setAcceptedTermsAndConditions(state, accepted: boolean) {
      state.acceptedTermsAndConditions = accepted;
    },
    setAccount(state, account: Account) {
      state.account = account;
    },
    setEmail(state, email: string) {
      state.email = email;
    },
    setLastLogin(state, lastLogin: string) {
      state.lastLogin = lastLogin;
    },
    setPage(state, page: string) {
      state.page = page;
    },
    setSettings(state, settings: Settings) {
      state.settings = settings;
    },
    setTwoFactorAuthenticationEnabled(state, enabled: boolean) {
      state.twoFactorAuthenticationEnabled = enabled;
    },
  },
  actions: {
    async acceptedTermsAndConditions({commit}): Promise<boolean> {
      response = await UserService.acceptedTermsAndConditions();

      commit(
        'setAcceptedTermsAndConditions',
        response.data.acceptedTermsAndConditions
      );

      return response.data.acceptedTermsAndConditions;
    },
    async changePassword({commit}, passwords: object): Promise<boolean> {
      response = await AuthService.changePassword(passwords);

      if (ResponseUtils.successProcessor(response)) {
        BuefyService.successToast(response.data.message);
        return true;
      }

      return false;
    },
    async getAccount({commit}): Promise<void> {
      response = await UserService.getAccount();

      commit('setAccount', response.data.account);
    },
    getPage({commit, state}, path: string): void {
      switch (path) {
        case '/dashboard/user/settings':
          commit('setPage', 'Settings');
          break;
        case '/dashboard/account/summary':
          commit('setPage', 'Summary');
          break;
        case '/dashboard/account/paybills':
          commit('setPage', 'PayBills');
          break;
        case '/dashboard/etransfers':
          commit('setPage', 'Etransfers');
          break;
        case '/dashboard/info':
          commit('setPage', 'Info');
          break;
        case '/dashboard/view':
          commit('setPage', 'DashboardSummary');
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

      commit('setSettings', response.data.settings);
    },
    async login({commit}, user: LoginRequest): Promise<void> {
      response = await AuthService.login(user);
      if (ResponseUtils.successAuthProcessor(response)) {
        const data = response.data;

        commit('auth_success');
        commit(
          'setTwoFactorAuthenticationEnabled',
          data.twoFactorAuthenticationEnabled
        );
        commit(
          'setAcceptedTermsAndConditions',
          data.acceptedTermsAndConditions
        );
        commit('setEmail', data.email);
        commit('setLastLogin', data.lastLogin);

        if (data.acceptedTermsAndConditions) {
          await WebsiteUtils.switchVue('dashboard');
        } else {
          await WebsiteUtils.switchVue('firstTimeLogin');
        }
      }
    },
    async logout(): Promise<void> {
      await AuthService.logout();
    },
    async register({commit}, user: RegisterRequest): Promise<boolean> {
      return ResponseUtils.successAuthProcessor(
        await AuthService.register(user)
      );
    },
    async saveSettings({commit}, settings: Settings): Promise<void> {
      response = await UserService.updateSettings(settings);

      if (ResponseUtils.successProcessor(response)) {
        commit('setSettings', response.data.settings);
        BuefyService.successToast(response.data.message);
      }
    },
    async saveTwoFactorAuthenticationEnabled(
      {commit},
      enabled: boolean
    ): Promise<void> {
      response = await AuthService.updateTwoFactorAuthenticationEnabled({
        twoFactorAuthenticationEnabled: enabled,
      });

      commit(
        'setTwoFactorAuthenticationEnabled',
        response.data.twoFactorAuthenticationEnabled
      );
    },
    async updateEmail({commit}, email: string): Promise<boolean> {
      response = await AuthService.updateEmail(email);

      if (ResponseUtils.successProcessor(response)) {
        commit('setEmail', response.data.newEmail);
        BuefyService.successToast(response.data.message);
        return true;
      }
      return false;
    },
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
    twoFactorAuthenticationEnabled: (state) =>
      state.twoFactorAuthenticationEnabled,
  },
});

export default store;
