import PropertiesConstants from '@/constants/properties-constants';
import router from '@/router';
import store from '@/store';

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
    if (page === 'dashboard/view') {
      await store.dispatch('getPage', `/dashboard/view`);
    } else {
      await store.dispatch('getPage', `/dashboard/${page}`);
    }
  }

  /**
   * Updates page title
   *
   * @param prefix
   */
  public static updatePageTitle(prefix: string): void {
    if (prefix === 'DashboardSummary') {
      document.title = 'Dashboard Summary' + PropertiesConstants.titleSuffix;
    } else if (prefix === 'PayBills') {
      document.title = 'Pay Bills' + PropertiesConstants.titleSuffix;
    } else if (prefix === 'AddPayee') {
      document.title = 'Add Payee' + PropertiesConstants.titleSuffix;
    } else if (prefix === 'RemovePayee') {
      document.title = 'Remove Payee' + PropertiesConstants.titleSuffix;
    } else if (prefix === 'Etransfers') {
      document.title = 'eTransfers' + PropertiesConstants.titleSuffix;
    } else if (prefix === 'DashboardSummary.vue') {
      document.title = 'Account Summary' + PropertiesConstants.titleSuffix;
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
}
