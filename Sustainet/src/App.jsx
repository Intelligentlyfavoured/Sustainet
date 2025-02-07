import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Modules/Login/login";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "./Modules/User Pages/AdminHome";
import InitiatorHome from "./Modules/User Pages/InitiatorHome";
import AuthorizerHome from "./Modules/User Pages/AuthorizerHome";
import ReviewerHome from "./Modules/User Pages/ReviewerHome";
import PaymentInitiatorHome from "./Modules/User Pages/PaymentInitiatorHome";
import FinalPaymentAuthorizerHome from "./Modules/User Pages/FinalPaymentAuthorizerHome";
import Sidebar from "./components/Sidebar";
import CreateVoucher from "./components/create-voucher";
// import ReviewVoucher from "./Modules/Vouchers/ReviewVoucher";
// import AuthorizeVoucher from "./Modules/Vouchers/AuthorizeVoucher";
// import InitiateVoucher from "./Modules/Vouchers/InitiateVoucher";
// import PaymentVoucher from "./Modules/Vouchers/PaymentVoucher";
// import DocumentationVoucher from "./Modules/Vouchers/DocumentationVoucher";
// import Users from "./Modules/Users";

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet /> {/* This will render the selected route inside this layout */}
      </div>
    </div>
  );
};
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar displayed for authenticated users */}
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Protected Routes */}
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

          <Route element={<PrivateRoute allowedRoles={["admin", "initiator"]} />}>
            <Route path="/create-voucher" element={<CreateVoucher />} />
          </Route>
{/* 
          <Route element={<PrivateRoute allowedRoles={["reviewer"]} />}>
            <Route path="/review-voucher" element={<ReviewVoucher />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["authorizer"]} />}>
            <Route path="/authorize-voucher" element={<AuthorizeVoucher />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["initiator"]} />}>
            <Route path="/initiate-voucher" element={<InitiateVoucher />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["payment_initiator"]} />}>
            <Route path="/payment-voucher" element={<PaymentVoucher />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/documentation-voucher" element={<DocumentationVoucher />} />
          </Route>


          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/users" element={<Users />} />
          </Route> */}


        </Routes>
      </div>
    </Router>
  );
}

export default App;
