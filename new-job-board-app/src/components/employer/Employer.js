import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmployerSignup from "./signup/EmployerSignup.js";
import EmployerConsole from "./console/EmployerConsole.js";
import EmployerConsoleNavBar from "./console/EmployerConsoleNavBar.js";
import EmployerAccount from "./account/EmployerAccount";
import CreateJobPostingModal from "./jobPosting/CreateJobPostingModal";
import ApplicationView from "./reviewApplication/ApplicationView";
import { logoutService } from "../../services/AccountServices";
import {
  loadEmployerInfoService,
  loadJobPostingFieldsService,
} from "../../services/employer/EmployerServices";
import { Container } from "semantic-ui-react";

function Employer() {
  const [employer, setEmployer] = useState({});
  const [jobPostingFields, setJobPostingFields] = useState([]);
  const [showCreateJobPostingModal, setShowCreateJobPostingModal] = useState(
    false
  );

  useEffect(() => {
    loadEmployerInfoService().then((response) => {
      response
        .json()
        .then((data) => {
          if (!data) {
            window.location.assign("login");
          } else {
            setEmployer(data);
          }
        })
        .then(
          loadJobPostingFieldsService().then((response) => {
            response.json().then((data) => {
              if (!data["hasError"]) {
                setJobPostingFields(data["jobPostingFields"]);
              }
            });
          })
        );
    });
  }, []);

  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var hashHistory = require("react-router").hashHistory;

  //this component will render before the useEffect has fired so employer will be null, is there a better way to load the employer and pass it down
  return (
    <Container fluid>

      <Router>
      <EmployerConsoleNavBar
        handleLogout={handleLogout}
        setShowCreateJobPostingModal={setShowCreateJobPostingModal}
      />
        <Switch>
          <Route
            exact
            path="/employer/account"
            render={() => <EmployerAccount employer={employer} />}
          />
          <Route
            exact
            path="/employer/employer-console"
            render={() => (
              <EmployerConsole
                employer={employer}
                jobPostingFields={jobPostingFields}
              />
            )}
          />
          <Route
            path="/employer/application/:employer_reference_id"
            component={ApplicationView}
          />
        </Switch>
      </Router>
      <CreateJobPostingModal
        setShowCreateJobPostingModal={setShowCreateJobPostingModal}
        showCreateJobPostingModal={showCreateJobPostingModal}
        employer={employer}
        jobPostingFields={jobPostingFields}
      />
    </Container>
  );
}

export default Employer;
