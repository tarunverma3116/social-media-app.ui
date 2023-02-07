import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./routes/index";
import GlobalSpinner from "./components/Spinner/GlobalSpinner";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="App dark:bg-white">
        <PublicRoutes />
        <PrivateRoutes />
        <GlobalSpinner />
        <ToastContainer
          // id="toast-message"
          position="bottom-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
