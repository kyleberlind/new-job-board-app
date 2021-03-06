import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { Container, Loader, Message } from "semantic-ui-react";
import ApplicantLogin from "./login/ApplicantLogin.js";
import ApplicantConsole from "./console/ApplicantConsole";
import ApplicantAccount from "./account/ApplicantAccount";
import ApplicantJobCart from "./jobCart/ApplicantJobCart";
import { logoutService } from "../../services/AccountServices";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApplicantConsoleNavBar from "./console/ApplicantConsoleNavBar";
import { GET_USER } from "../../services/graphql/queries/ApplicantQueries";
import MyApplicationsView from "../applicant/MyApplicationsView";
import { getFailureToastWithMessage } from "../shared/toast/ToastOptions.js";
import { loadJobCart } from "../../services/applicant/ApplicantServices";
import ApplicationView from "../applicant/application/ApplicationView"

function Applicant(props) {
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    loadJobCart().then((result) => {
      console.log(result);
    });
  }, []);

  useEffect(() => {
    if (data) {
      props.loadApplicant(data.user);
    }
  }, [data]);

  const handleLogout = () => {
    logoutService()
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        props.openToast(
          getFailureToastWithMessage("Failed to logout, please try again.")
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
          <ApplicantConsoleNavBar handleLogout={handleLogout} />
          <Switch>
            <Route path="/applicant" exact>
              <h2>Hello Applicant</h2>
            </Route>
            <Route path="/applicant/account" component={ApplicantAccount} />
            <Route path="/applicant/login" component={ApplicantLogin} />
            <Route
              path="/applicant/applicant-console"
              component={ApplicantConsole}
            />
            <Route
              path="/applicant/applications"
              component={MyApplicationsView}
            />
            <Route path="/applicant/apply/job-id=:jobId" component={ApplicationView} />
            <Route path="/applicant/job-cart" component={ApplicantJobCart} />
          </Switch>
        </Router>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadApplicant: (applicant) =>
      dispatch({ type: "LOAD_APPLICANT", payload: applicant }),
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
  };
};

export default connect(null, mapDispatchToProps)(Applicant);
