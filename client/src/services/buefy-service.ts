import * as buefy from "buefy";
import { BLoadingComponent } from "buefy/types/components";

/**
 * Programmatic services by Buefy
 */
export default class BuefyService {
  public static loadingComponent: BLoadingComponent;

  public static successToast(message: string) {
    buefy.ToastProgrammatic.open({
      duration: 2000,
      message: message !== null ? message : "Success",
      type: "is-success",
      position: "is-bottom-right",
    });
  }

  public static dangerToast(error: string) {
    buefy.ToastProgrammatic.open({
      duration: 2000,
      message: error !== null ? error : "Error",
      type: "is-danger",
      position: "is-bottom-right",
    });
  }

  public static startLoading() {
    // this.loadingComponent = buefy.LoadingProgrammatic.open({
    //   container: null,
    // });
  }

  public static stopLoading() {
    // this.loadingComponent.close();
  }
}
