import React from "react";
import {useSelector,useDispatch} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SubContactorRegister from "./components/sub-contractor/Register";
import DriverRegister from "./components/driver/Register";
import SubContactorLogin from "./components/sub-contractor/Login";
import DriverLogin from "./components/driver/Login";
import SubContractorVerifyAccount from "./components/sub-contractor/VerifyAccount";
import DriverVerifyAccount from "./components/driver/VerifyAccount";
import SubContractorForgotPassword from "./components/sub-contractor/ForgotPassword";
import DriverForgotPassword from "./components/driver/ForgotPassword";
import SubContractorResetPassword from "./components/sub-contractor/ResetPassword";
import DriverResetPassword from "./components/driver/ResetPassword";
import AdminLogin from "./components/admin/Login";
import {ProtectVerifyAccount,IsLoggedInSubContractor,IsLoggedInDriver,NotLoggedIn} from "./ProtectedRoute";
import DriverDashboard from "./components/driver/Dashboard";
import SubContractorDashboard from "./components/sub-contractor/Dashboard";
import SubContractorSameCity from "./components/sub-contractor/jobs/SameCity";
import SubContractorInterState from "./components/sub-contractor/jobs/InterState";
import SubContractorCardHome from "./components/sub-contractor/card/Home";
import SubContractorCardAddCard from "./components/sub-contractor/card/AddCard";


import DriverCardHome from "./components/driver/card/Home";
import DriverCardAddCard from "./components/driver/card/AddCard";


import SubContractorHistoryHome from "./components/sub-contractor/history/Home";
import SubContractorHistoryBids from "./components/sub-contractor/history/Bids";
import SubContractorHistoryEdit from "./components/sub-contractor/history/Edit";

import DriverHistoryHome from "./components/driver/history/Home";
import DriverHistoryBids from "./components/driver/history/Bids";



import SubContractorUserView from "./components/sub-contractor/user/View";



import SubContractorSettingUpdateProfile from "./components/sub-contractor/setting/UpdateProfile";
import SubContractorSettingTwoFactorAuthentication from "./components/sub-contractor/setting/TwoFactorAuthentication";
import SubContractorSettingVerifyAccount from "./components/sub-contractor/setting/VerifyAccount";

import DriverSettingUpdateProfile from "./components/driver/setting/UpdateProfile";
import DriverSettingTwoFactorAuthentication from "./components/driver/setting/TwoFactorAuthentication";
import DriverSettingVerifyAccount from "./components/driver/setting/VerifyAccount";


import SubContractorSupportHome from "./components/sub-contractor/support/Home";
import DriverJobsCity from "./components/driver/jobs/City";
import DriverJobsOutside from "./components/driver/jobs/Outside";
import DriverEarnings from "./components/driver/earnings/Home";
import DriverOrdersHome from "./components/driver/orders/Home";
import SubContractorOrdersHome from "./components/sub-contractor/orders/Home";

import VerifyPayment from "./components/payment/Verify";


function App() {
  return (
        <Router>
          <Switch>
           <IsLoggedInSubContractor exact path="/" component={SubContactorRegister} />
           
           <NotLoggedIn exact path="/sub-contractor/register" component={SubContactorRegister} />
           <NotLoggedIn exact path="/driver/register" component={DriverRegister} />
           <NotLoggedIn exact path="/sub-contractor/login" component={SubContactorLogin} />
           <NotLoggedIn exact path="/driver/login" component={DriverLogin} />
           <NotLoggedIn exact path="/admin/login" component={AdminLogin} />
           <ProtectVerifyAccount exact path="/sub-contractor/verify-account" component={SubContractorVerifyAccount} />
           <ProtectVerifyAccount exact path="/driver/verify-account" component={DriverVerifyAccount} />
           <NotLoggedIn exact path="/sub-contractor/forgot-password" component={SubContractorForgotPassword} />
           <NotLoggedIn exact path="/driver/forgot-password" component={DriverForgotPassword} />
           <NotLoggedIn exact path="/sub-contractor/reset-password" component={SubContractorResetPassword} />
           <NotLoggedIn exact path="/driver/reset-password" component={DriverResetPassword} />


           <IsLoggedInDriver exact path="/driver/dashboard" component={DriverDashboard} />

           <IsLoggedInSubContractor exact path="/sub-contractor/dashboard" component={SubContractorDashboard} />

           <IsLoggedInSubContractor exact path="/sub-contractor/jobs/same-city" component={SubContractorSameCity} />
           <IsLoggedInSubContractor exact path="/sub-contractor/jobs/inter-state" component={SubContractorInterState} />
          
           <IsLoggedInSubContractor exact path="/sub-contractor/add-card" component={SubContractorCardAddCard} />'

           <IsLoggedInSubContractor exact path="/sub-contractor/card" component={SubContractorCardHome} />


          <IsLoggedInSubContractor exact path="/sub-contractor/history" component={SubContractorHistoryHome} />
           <IsLoggedInSubContractor exact path="/sub-contractor/history/bids" component={SubContractorHistoryBids} />
           <IsLoggedInSubContractor exact path="/sub-contractor/history/edit" component={SubContractorHistoryEdit} />


           


       <IsLoggedInDriver exact path="/driver/history" component={DriverHistoryHome} />
        <IsLoggedInDriver exact path="/driver/history/bids" component={DriverHistoryBids} />


           <IsLoggedInSubContractor exact path="/sub-contractor/user/:id" component={SubContractorUserView} />


           <IsLoggedInDriver exact path="/driver/card" component={DriverCardHome} />
           <IsLoggedInDriver exact path="/driver/add-card" component={DriverCardAddCard} />

          <IsLoggedInDriver exact path="/driver/jobs/city" component={DriverJobsCity} />
          <IsLoggedInDriver exact path="/driver/jobs/outside" component={DriverJobsOutside} />
          <IsLoggedInDriver exact path="/driver/earnings" component={DriverEarnings} />

          <IsLoggedInDriver exact path="/driver/orders" component={DriverOrdersHome} />

           <IsLoggedInDriver exact path="/sub-contractor/orders" component={SubContractorOrdersHome} />



           <IsLoggedInSubContractor exact path="/sub-contractor/setting/update-profile" component={SubContractorSettingUpdateProfile} />
            <IsLoggedInSubContractor exact path="/sub-contractor/setting/two-factor-authentication" component={SubContractorSettingTwoFactorAuthentication} />
             <IsLoggedInSubContractor exact path="/sub-contractor/setting/verify-account" component={SubContractorSettingVerifyAccount} />


          <IsLoggedInSubContractor exact path="/driver/setting/update-profile" component={DriverSettingUpdateProfile} />
            <IsLoggedInDriver exact path="/driver/setting/two-factor-authentication" component={DriverSettingTwoFactorAuthentication} />
             <IsLoggedInDriver exact path="/driver/setting/verify-account" component={DriverSettingVerifyAccount} />


             <VerifyPayment exact path="/payment/verify" component={() => <VerifyPayment />} />
             </Switch>
        </Router>
    
  );
}

export default App;
