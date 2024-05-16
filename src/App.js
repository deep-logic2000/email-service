import { useEffect } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import AppRoutes from "./pages/AppRoutes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./components/AuthProvider/AuthProvider";

import SnackBar from "./components/SnackBar";

function App() {

  let navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <AppRoutes />
      <SnackBar />
    </div>
  );

  // const emails = useSelector((state) => state.emails.emails);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  //   dispatch(getAllEmails());
  // }, [dispatch]);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>Email service</h1>
  //       <ul>
  //         {emails.length > 0 && emails.map((email) => (
  //           <li key={email.id}>
  //             <p>{email.id} - {email.recipient} - {email.subject}</p>
  //           </li>
  //         ))}
  //       </ul>
  //     </header>
  //   </div>
  // );
}

export default App;
