import { Route, BrowserRouter as Router, Routes } from "react-router";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

import Ecommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Forms/FormElements";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route index path="/dashboard" element={<Ecommerce />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<FormElements />} />
        </Routes>
      </Router>
    </>
  );
}
