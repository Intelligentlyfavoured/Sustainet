import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/login";
import PrivateRoute from "./PrivateRoute";
import AdminHome from './Modules/User Pages/AdminHome';
import InitiatorHome from "./Modules/User Pages/InitiatorHome";
import AuthorizerHome from "./Modules/User Pages/AuthorizerHome";
import ReviewerHome from "./Modules/User Pages/ReviewerHome";
import PaymentInitiatorHome from "./Modules/User Pages/PaymentInitiatorHome";
import FinalPaymentAuthorizerHome from "./Modules/User Pages/FinalPaymentAuthorizerHome";
import Reviewer from "./components/Reviewer";
import VoucherAuthorization from "./components/VoucherAuthorization";
import PaymentAuthorization from "./components/PaymentAuthorization";
import PaymentInitiation from "./components/PaymentInitiation";
import CreateVoucher from "./components/create-voucher";
import CreateSupplier from "./components/create-supplier";
import UserGroupsTable from "./components/userGroupsTable";
import ListContainer from "./components/ListContainer";
// import Documentation from "./components/Documentation";


import Documentation from "./components/Documentation";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />


        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="Reviewer" element={<Reviewer />} />
        <Route path="VoucherAuthorization" element={<VoucherAuthorization />} />
        <Route path="PaymentInitiation" element={<PaymentInitiation />} />
        <Route path="PaymentAuthorization" element={<PaymentAuthorization />} />
        <Route path="create-voucher" element={<CreateVoucher />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="/userGroupsTable" element={<UserGroupsTable />} />
        <Route path="/ListContainer" element={<ListContainer />} />

        <Route path="create-supplier" element={<CreateSupplier />} />




        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/AdminHome" element={<AdminHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["initiator"]} />}>
          <Route path="/initiator-home" element={<InitiatorHome />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["authorizer"]} />}>
          <Route path="/authorizer-home" element={<AuthorizerHome />} />
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
