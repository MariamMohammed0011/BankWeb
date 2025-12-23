import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./Auth/Login.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./Auth/ProtectedRoute.jsx";
import AddEmpl from "./pages/employees/addEmployee/AddEmpl.jsx";
import AddAccountType from "./pages/accountsTypes/AddAccountType.jsx";
import AccountTypeDetails from "./pages/accountsTypes/AccountTypeDetails.jsx";
import AccountTypeList from "./pages/accountsTypes/AccountTypeList.jsx";
import EditAccountType from "./pages/accountsTypes/EditAccountType.jsx";
import AddClient from "./pages/clients/AddClient.jsx";
import AddBankAccount from "./pages/accounts/AddBankAccount.jsx";
import AllAccounts from "./pages/accounts/AllAccounts.jsx";
import AccountDetails from './pages/accounts/AccountDetails.jsx';
import EditAccount from "./pages/accounts/EditAccount.jsx";
import AddFeature from "./pages/features/AddFeature.jsx";
import FeatureList from "./pages/features/FeatureList.jsx";
import SubAccountList from "./pages/SubAccount/SubAccountList.jsx";
import AddSubAccount from "./pages/SubAccount/AddSubAccount.jsx";
import Deposit from "./pages/Transactions/Deposit.jsx";
import Withdrawal from "./pages/Transactions/Withdrawal.jsx";
import Transfer from "./pages/Transactions/Transfer.jsx";
import PendingApprovals from "./pages/PendingApprovals.jsx";
import AccountHierarchy from "./pages/accounts/AccountHierarchy.jsx";
import AccountStateManager from "./pages/accounts/AccountStateManager.jsx";
import DailyTransactionReport from "./pages/transaction/DailyTransactionReport.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route path="employees/create" element={<AddEmpl />} />
        <Route path="accountType" element={<AddAccountType />} />
        <Route path="account-types" element={<AccountTypeList />} />
        <Route path="/account-types/:id" element={<AccountTypeDetails />} />
        <Route path="/AccountType/edit/:id" element={<EditAccountType />} />
        <Route path="addClient" element={<AddClient />} />
        <Route path="addAccount" element={<AddBankAccount />} />
        <Route path="/getAllAccount" element={<AllAccounts />} />
        <Route path="/accounts/details" element={<AccountDetails />} />
         <Route path="/accounts/edit/:clientAccountId" element={<EditAccount/>} />
         <Route path="/features" element={<FeatureList />} />
        <Route path="/features/add" element={<AddFeature />} />
        <Route path="/sub-accounts" element={<SubAccountList />} />
        <Route path="/sub-accounts/add" element={<AddSubAccount />} />
        <Route path="/transactions/deposit" element={<Deposit />} />
        <Route path="/transactions/Withdrawal" element={<Withdrawal />} />
        <Route path="/transactions/transfer" element={<Transfer />} />
        <Route path="/approvals/pending" element={<PendingApprovals />} />
        <Route path="/accounts/hierarchy" element={<AccountHierarchy />} />
        <Route path="/stateOfAccounts" element={<AccountStateManager />} />
         <Route path="/reports" element={<DailyTransactionReport />} />


      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
