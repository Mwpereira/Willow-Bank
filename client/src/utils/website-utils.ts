import PropertiesConstants from "@/constants/properties-constants";
import router from "@/router";
import BuefyService from "@/services/buefy-service";
import store from "@/store";

export default class WebsiteUtils {
  /**
   * Switches current view
   *
   * @param view
   */
  public static async switchVue(view: string): Promise<void> {
    await router.push(`/${view}`);
  }

  /**
   * Switches current page
   *
   * @param page
   */
  public static async switchPage(page: string): Promise<void> {
    if (page === "dashboard/view") {
      await store.dispatch("getPage", "/dashboard/view");
    } else {
      await store.dispatch("getPage", `/dashboard/${page}`);
    }
  }

  /**
   * Updates page title
   *
   * @param prefix
   */
  public static updatePageTitle(prefix: string): void {
    if (prefix === "DashboardSummary") {
      document.title = "Dashboard Summary" + PropertiesConstants.titleSuffix;
    } else if (prefix === "PayBills") {
      document.title = "Pay Bills" + PropertiesConstants.titleSuffix;
    } else if (prefix === "ManagePayees") {
      document.title = "Manage Payees" + PropertiesConstants.titleSuffix;
    } else if (prefix === "AddPayee") {
      document.title = "Add Payee" + PropertiesConstants.titleSuffix;
    } else if (prefix === "PastTransfers") {
      document.title = "Past Transfers" + PropertiesConstants.titleSuffix;
    } else if (prefix === "SendEtransfer") {
      document.title = "Send e-Transfer" + PropertiesConstants.titleSuffix;
    } else if (prefix === "ManageContacts") {
      document.title = "Manage Contacts" + PropertiesConstants.titleSuffix;
    } else if (prefix === "AddContact") {
      document.title = "Add Contact" + PropertiesConstants.titleSuffix;
    } else if (prefix === "RemoveContact") {
      document.title = "Remove Contact" + PropertiesConstants.titleSuffix;
    } else if (prefix === "AccountSummary") {
      document.title = "Account Summary" + PropertiesConstants.titleSuffix;
    } else {
      const title =
        prefix.substr(0, 1).toUpperCase() +
        prefix.substr(1) +
        PropertiesConstants.titleSuffix;

      if (document.title !== title) {
        document.title = title;
      }
    }
  }

  public static async checkAccount() {
    if (store.getters.account === null) {
      BuefyService.startLoading();

      await store.dispatch("getAccount");

      BuefyService.stopLoading();
    }
  }

  public static async checkEtransfer() {
    if (store.getters.etransfer === null) {
      BuefyService.startLoading();

      await store.dispatch("getEtransferData");

      BuefyService.stopLoading();
    }
  }

  public static async checkSettings() {
    if (store.getters.settings === null) {
      BuefyService.startLoading();

      await store.dispatch("getSettings");

      BuefyService.stopLoading();
    }
  }
}
