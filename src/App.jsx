import { Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LoginPage from './pages/LoginPage'

function App() {
  return (
    
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
