import { Account } from "@/interfaces/account";
import { AdminTransaction } from "@/interfaces/admin-transaction";
import { LoginRequest } from "@/interfaces/login-request";
import { RegisterRequest } from "@/interfaces/register-request";
import { Settings } from "@/interfaces/settings";
import { Transaction } from "@/interfaces/transaction";
import { UpdateContactRequest } from "@/interfaces/update-contact-request";
import { UpdatePayeeRequest } from "@/interfaces/update-payee-request";
import AuthService from "@/services/auth-service";
import BuefyService from "@/services/buefy-service";
import UserService from "@/services/user-service";
import ResponseUtils from "@/utils/response-utils";
import WebsiteUtils from "@/utils/website-utils";
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Etransfer } from "../../../serverless/src/interfaces/etransfer";
import { EtransferTransaction } from "../../../serverless/src/interfaces/etransfer-transaction";

Vue.use(Vuex);

let response: any;
let data: any;

const store = new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    acceptedTermsAndConditions: null,
    account: null,
    email: null,
    etransfer: null,
    isLoggedIn: false,
    lastLogin: null,
    page: "DashboardSummary",
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
      state.etransfer = null;
      state.email = null;
      state.etransfer = null;
      state.isLoggedIn = false;
      state.lastLogin = null;
      state.page = "DashboardSummary";
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
    setEtransfer(state, etransfer: Etransfer) {
      state.etransfer = etransfer;
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
    async acceptedTermsAndConditions({ commit }): Promise<boolean> {
      response = await UserService.acceptedTermsAndConditions();

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit(
          "setAcceptedTermsAndConditions",
          data.acceptedTermsAndConditions
        );

        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
    async changePassword({ commit }, passwords: object): Promise<boolean> {
      response = await AuthService.changePassword(passwords);

      if (ResponseUtils.successProcessor(response)) {
        BuefyService.successToast(await response.json().message);
        return true;
      }

      return false;
    },
    async deleteUser(): Promise<boolean> {
      response = await AuthService.deleteUser();

      store.commit("auth_logout");
      await WebsiteUtils.switchVue("login");

      if (ResponseUtils.successProcessor(response)) {
        BuefyService.successToast(await response.json().message);
        return true;
      }
      return false;
    },
    async getAccount({ commit }): Promise<void> {
      response = await (await UserService.getAccount()).json();

      commit("setAccount", await response.account);
    },
    async getEtransferData({ commit }): Promise<void> {
      response = await (await UserService.getEtransferData()).json();

      commit("setEtransfer", await response.etransfer);
    },
    getPage({ commit, state }, path: string): void {
      switch (path) {
        case "/dashboard/user/settings":
          commit("setPage", "Settings");
          break;
        case "/dashboard/account/summary":
          commit("setPage", "AccountSummary");
          break;
        case "/dashboard/account/payBills":
          commit("setPage", "PayBills");
          break;
        case "/dashboard/account/managePayees":
          commit("setPage", "ManagePayees");
          break;
        case "/dashboard/account/managePayees/add":
          commit("setPage", "AddPayee");
          break;
        case "/dashboard/account/managePayees/remove":
          commit("setPage", "RemovePayee");
          break;
        case "/dashboard/etransfer/transfers":
          commit("setPage", "PastTransfers");
          break;
        case "/dashboard/etransfer/sendEtransfer":
          commit("setPage", "SendEtransfer");
          break;
        case "/dashboard/etransfer/manageContacts":
          commit("setPage", "ManageContacts");
          break;
        case "/dashboard/etransfer/manageContacts/add":
          commit("setPage", "AddContact");
          break;
        case "/dashboard/etransfer/manageContacts/remove":
          commit("setPage", "RemoveContact");
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
    async getSettings({ commit }): Promise<void> {
      response = await (await UserService.getSettings()).json();

      commit("setSettings", response.settings);
    },
    async login({ commit }, user: LoginRequest): Promise<void> {
      response = await AuthService.login(user);

      if (ResponseUtils.successAuthProcessor(response)) {
        data = await response.json();

        commit("auth_success");
        commit(
          "setTwoFactorAuthenticationEnabled",
          data.twoFactorAuthenticationEnabled
        );
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
    async register({ commit }, user: RegisterRequest): Promise<boolean> {
      return ResponseUtils.successAuthProcessor(
        await AuthService.register(user)
      );
    },
    async payBill({ commit }, transaction: Transaction): Promise<boolean> {
      response = await UserService.payBill(transaction);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setAccount", data.account);
        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
    async saveSettings({ commit }, settings: Settings): Promise<void> {
      response = await UserService.updateSettings(settings);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setSettings", data.settings);
        BuefyService.successToast(data.message);
      }
    },
    async saveTwoFactorAuthenticationEnabled(
      { commit },
      enabled: boolean
    ): Promise<void> {
      response = await AuthService.updateTwoFactorAuthenticationEnabled({
        twoFactorAuthenticationEnabled: enabled,
      });

      commit(
        "setTwoFactorAuthenticationEnabled",
        response.json().twoFactorAuthenticationEnabled
      );
    },
    async sendEtransfer(
      { commit },
      transaction: EtransferTransaction
    ): Promise<boolean> {
      response = await UserService.sendEtransfer(transaction);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setAccount", data.account);
        commit("setEtransfer", data.etransfer);
        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
    async sendTransaction(
      { commit },
      transaction: AdminTransaction
    ): Promise<boolean> {
      response = await UserService.sendAdminTransaction(transaction);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setAccount", response.json().account);
        BuefyService.successToast(response.json().message);
        return true;
      }
      return false;
    },
    async updateContacts(
      { commit },
      updateContactRequest: UpdateContactRequest
    ): Promise<boolean> {
      response = await UserService.updateContacts(updateContactRequest);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setEtransfer", data.etransfer);
        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
    async updateEmail({ commit }, email: string): Promise<boolean> {
      response = await AuthService.updateEmail(email);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setEmail", data.newEmail);
        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
    async updatePayees(
      { commit },
      updatePayeesRequest: UpdatePayeeRequest
    ): Promise<boolean> {
      response = await UserService.updatePayees(updatePayeesRequest);

      if (ResponseUtils.successProcessor(response)) {
        data = await response.json();

        commit("setAccount", data.account);
        BuefyService.successToast(data.message);
        return true;
      }
      return false;
    },
  },
  modules: {},
  getters: {
    acceptedTermsAndConditions: (state) => state.acceptedTermsAndConditions,
    account: (state) => state.account,
    email: (state) => state.email,
    etransfer: (state) => state.etransfer,
    isLoggedIn: (state) => state.isLoggedIn,
    lastLogin: (state) => state.lastLogin,
    page: (state) => state.page,
    settings: (state) => state.settings,
    twoFactorAuthenticationEnabled: (state) =>
      state.twoFactorAuthenticationEnabled,
  },
});

export default store;
