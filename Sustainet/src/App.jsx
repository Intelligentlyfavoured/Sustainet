import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/login";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "./Modules/User Pages/AdminHome";
import InitiatorHome from "./Modules/User Pages/InitiatorHome";
import AuthoratorHome from "./Modules/User Pages/AuthoratorHome";
import ReviewerHome from "./Modules/User Pages/ReviewerHome";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/AdminHome" element={<AdminHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["initiator"]} />}>
          <Route path="/InitiatorHome" element={<InitiatorHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["authorator"]} />}>
          <Route path="/AuthoratorHome" element={<AuthoratorHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["reviewer"]} />}>
          <Route path="/reviewer-home" element={<ReviewerHome />} />
        </Route>

        {/* <Route element={<PrivateRoute allowedRoles={["payment_initiator"]} />}>
          <Route path="/payment-initiator-home" element={<PaymentInitiatorHome />} />
        </Route> */}

        {/* <Route element={<PrivateRoute allowedRoles={["final_payment_authoritator"]} />}>
          <Route path="/final-payment-authoritator-home" element={<FinalPaymentAuthoritatorHome />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
