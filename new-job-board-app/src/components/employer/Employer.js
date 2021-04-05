import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EmployerConsole from "./console/EmployerConsole.js";
import EmployerConsoleNavBar from "./console/EmployerConsoleNavBar.js";
import EmployerAccount from "./account/EmployerAccount";
import CreateJobPostingModal from "./jobPosting/CreateJobPostingModal";
import ApplicationView from "./reviewApplication/ApplicationView";
import { logoutService } from "../../services/AccountServices";
import Toast from "../shared/toast/Toast";
import { loadJobPostingFieldsService } from "../../services/employer/EmployerServices";
import { Container, Loader, Message } from "semantic-ui-react";
import { getFailureToastWithMessage } from "../shared/toast/ToastOptions";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYER } from "../../services/graphql/queries/EmployerQueries";

function Employer(props) {
  const [jobPostingFields, setJobPostingFields] = useState([]);
  const [showCreateJobPostingModal, setShowCreateJobPostingModal] = useState(
    false
  );

  const { loading, error, data } = useQuery(GET_EMPLOYER);

  useEffect(() => {
    if (data) {
      props.loadEmployer(data.employer);
    }

    loadJobPostingFieldsService().then((response) => {
      response.json().then((data) => {
        if (!data["hasError"]) {
          setJobPostingFields(data["jobPostingFields"]);
        }
      });
    });
  }, [data]);

  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        props.openToast(
          getFailureToastWithMessage("Logout failed, please try again.")
        );
      });
  };

  if (loading) {
    return <Loader active></Loader>;
  } else if (error) {
    return <Message content="Error loading your information!" negative />;
  } else {
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
              render={() => <EmployerAccount />}
            />
            <Route
              exact
              path="/employer/employer-console"
              render={() => (
                <EmployerConsole jobPostingFields={jobPostingFields} />
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
          jobPostingFields={jobPostingFields}
        />
        <Toast />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEmployer: (employer) =>
      dispatch({ type: "LOAD_EMPLOYER", payload: employer }),
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
  };
};

export default connect(null, mapDispatchToProps)(Employer);
