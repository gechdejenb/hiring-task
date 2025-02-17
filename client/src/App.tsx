import { Route, BrowserRouter as Router, Routes } from "react-router";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import Ecommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Forms/FormElements";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Router>
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Ecommerce />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<FormElements />} />
      </Routes>
    </Router>
    </>
  );
}
