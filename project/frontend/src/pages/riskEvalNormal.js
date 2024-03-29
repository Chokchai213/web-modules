import React, { useState } from "react";
import Navigate from "components/Navbar";

import { RiskLevel } from "components/RiskLevel_RiskEvalNormal";
import { EvaluationForm } from "components/RiskEvalForm_RiskEvalNormal";
import "./normalGoal.css";

export const RiskEvalNormalPage = ({ setAllowedToAccessNormalGoal }) => {
  const [showRiskLevel, setshowRiskLevel] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  return (
    <React.Fragment>
      <Navigate />
      {!showRiskLevel ? (
        <EvaluationForm
          setshowRiskLevel={setshowRiskLevel}
          setEvaluationResult={setEvaluationResult}
        />
      ) : (
        <RiskLevel
          evaluationResult={evaluationResult}
          setshowRiskLevel={setshowRiskLevel}
          setAllowedToAccessNormalGoal={setAllowedToAccessNormalGoal}
        />
      )}
    </React.Fragment>
  );
};
