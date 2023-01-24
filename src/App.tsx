import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PublicRoutes } from "./routes/index";

function App() {
  return (
    <BrowserRouter>
      <div className="App dark:bg-white">
        <PublicRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
