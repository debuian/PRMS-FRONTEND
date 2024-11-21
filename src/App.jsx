import { BrowserRouter, Route, Routes } from "react-router-dom";
import PathologyLogin from "./pages/PathologyLogin";
import PathologySignup from "./pages/Pathologysignup";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pathology-login" element={<PathologyLogin />} />
        <Route path="/pathology-signup" element={<PathologySignup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
