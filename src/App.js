import Router from "./Routes";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "./store/configureStore";
import AlertError from "./common/alerts/alertError";
import AlertClose from "./common/alerts/alertClose";

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <ToastContainer
        hideProgressBar
        autoClose={5000}
        toastClassName="alert alert-success alert-white"
        closeButton={<AlertClose />}
      />
      <Router />
    </Provider>
  );

  // </Provider>
}

export default App;
