import "App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "pages/dashboard";
import { Home } from "pages/homepage";
import { GoalBased } from "pages/goalbased";
import { NewTaxGoal } from "pages/newtaxgoal";
import { useDispatch, useSelector } from "react-redux";
import { LoginWithLocalData } from "./store/UserSlice";
import { SelectFund } from "pages/selectFund";
import axios from "axios";
import { Login } from "./store/UserSlice";
import { NormalGoal } from "pages/normalGoal";
import { GoalFirst } from "pages/normalGoalFirst";
import { RiskEvalNormalPage } from "pages/riskEvalNormal";
import { useState } from "react";
import { TaxCal } from "pages/taxCalcuation";

const baseURL = "http://localhost:8000";
function RequireAuth({ children, redirectTo }) {
  const localUser = JSON.parse(localStorage.getItem("userData"));
  if (!localUser) {
    alert("Please Login");
    return <Navigate to={redirectTo} />;
  }
  return localUser.isLogIn ? children : <Navigate to={redirectTo} />;
}
function App() {
  const userStore = useSelector((state) => state.userStore);
  const dispatch = useDispatch();

  const [allowedToAccessNormalGoal, setAllowedToAccessNormalGoal] =
    useState(false);

  try {
    if (userStore.userId === null) {
      const localUser = localStorage.getItem("userData");
      if (localUser) {
        axios
          .post(`${baseURL}/auth/veriylocaluser`, {
            localUser: localUser,
          })
          .then((res) => {
            dispatch(LoginWithLocalData(JSON.parse(localUser)));
          })
          .catch((e) => {
            localStorage.removeItem("userData");
            console.log(e);
          });
      }
    }
  } catch (e) {
    console.log(e);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<RequireAuth redirectTo="/">{<Dashboard />}</RequireAuth>}
        />
        <Route
          path="/Goal-Based"
          element={<RequireAuth redirectTo="/">{<GoalBased />}</RequireAuth>}
        />
        <Route path="/Goal-Based/reduce-tax-goal" element={<NewTaxGoal />} />
        <Route
          path="/Goal-Based/risk-evaluation-normal"
          element={
            <RequireAuth redirectTo="/">
              {
                <RiskEvalNormalPage
                  setAllowedToAccessNormalGoal={setAllowedToAccessNormalGoal}
                />
              }
            </RequireAuth>
          }
        />
        <Route
          path="/Goal-Based/normal-goal"
          element={
            <RequireAuth redirectTo="/">
              <NormalGoal />
            </RequireAuth>
          }
        />
        <Route
          path="/Goal-Based/normal-goal-first"
          element={<RequireAuth redirectTo="/">{<NormalGoal />}</RequireAuth>}
        />
        <Route
          path="/Goal-Based/reduce-tax-goal/select-fund"
          element={<SelectFund />}
        />
        <Route
          path="/tax-calculation"
          element={<RequireAuth redirectTo="/">{<TaxCal />}</RequireAuth>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
