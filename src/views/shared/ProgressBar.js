import NProgress from "nprogress";
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true });

export default class ProgressBar {
    static start() {
        NProgress.start();
    }

    static done() {
        NProgress.done();
    }
}
