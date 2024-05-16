import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import SendEmailPage from "./SendEmailPage";
import PrivateRoute from "../Routes/PrivateRoute";
import EmailsPage from "./EmailsPage";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/email" element={<SendEmailPage />} />
        <Route path="/emails" element={<EmailsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
