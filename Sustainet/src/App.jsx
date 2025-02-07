import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/login";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "./Modules/User Pages/AdminHome";
import InitiatorHome from "./Modules/User Pages/InitiatorHome";
import AuthorizerHome from "./Modules/User Pages/AuthorizerHome";
import ReviewerHome from "./Modules/User Pages/ReviewerHome";
import PaymentInitiatorHome from "./Modules/User Pages/PaymentInitiatorHome";
import FinalPaymentAuthorizerHome from "./Modules/User Pages/FinalPaymentAuthorizerHome";
import AuthorizerVoucher from "./components/AuthorizerVoucher";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="AuthorizerVoucher" element={<AuthorizerVoucher/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/AdminHome" element={<AdminHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["initiator"]} />}>
          <Route path="/InitiatorHome" element={<InitiatorHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["authorizer"]} />}>
          <Route path="/AuthorizerHome" element={<AuthorizerHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["reviewer"]} />}>
          <Route path="/reviewer-home" element={<ReviewerHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["payment_initiator"]} />}>
          <Route path="/payment-initiator-home" element={<PaymentInitiatorHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["final_payment_authorizer"]} />}>
          <Route path="/final-payment-authorizer-home" element={<FinalPaymentAuthorizerHome />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
