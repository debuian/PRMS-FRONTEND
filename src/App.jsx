import { BrowserRouter, Route, Routes } from "react-router-dom";
import PathologyLogin from "./pages/PathologyLogin";
import PathologySignup from "./pages/Pathologysignup";
import MainPage from "./pages/MainPage";
import PharmacyLogin from "./pages/PharmacyLogin";
import PharmacySingup from "./pages/PharmacySingup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<MainPage />} />
        <Route path="/pathology-login" element={<PathologyLogin />} />
        <Route path="/pathology-signup" element={<PathologySignup />} />
        <Route path="/pharmacy-login" element={<PharmacyLogin />} />
        <Route path="/pharmacy-signup" element={<PharmacySingup />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
