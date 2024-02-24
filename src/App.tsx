import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainForm from "./components/Registratation/MainForm";
import Login from "./components/Login/login";
import Dashboard from "./components/AdminDashboard/dashboard";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import RecordDownload from "./components/RecordDownload/RecordDownload";
import Protected from "./PrivateRoute";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import UpdateRegistrationForm from "./components/UpdateRegistrationForm/UpdateRegistrationForm";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainForm />}></Route>{" "}
          <Route
            path="/dashboard"
            element={<Protected Component={Dashboard} />}
          />
          <Route
            path="/userDashboard"
            element={<Protected Component={UserDashboard} />}
          />
          <Route
            path="/update-registration-form"
            element={<Protected Component={UpdateRegistrationForm} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/record-download"
            element={<Protected Component={RecordDownload} />}
          />
          <Route path="/set-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
