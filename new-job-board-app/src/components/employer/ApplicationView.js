import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Loader } from "semantic-ui-react";
import { loadJobApplicantionByEmployerReferenceId } from "../../services/employer/EmployerServices";

const ApplicationView = (props) => {
  const [jobApplication, setJobApplications] = useState({});
  const [isApplicationLoading, setIsApplicationLoading] = useState(true);

  useEffect(() => {
    setIsApplicationLoading(true);
    loadJobApplicantionByEmployerReferenceId(props.match.params.id)
      .then((response) => {
        response.json().then((data) => {
          if (data["hasError"]) {
            console.log(data["errorMessage"]);
          } else {
            setJobApplications(data);
          }
          setIsApplicationLoading(false);
        });
      })
      .catch((error) => {
        setIsApplicationLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Card>
      {isApplicationLoading ? (
        <Loader active />
      ) : (
        jobApplication.applicantInfo.emailAddress
      )}
    </Card>
  );
};

ApplicationView.propTypes = {
  jobPosting: PropTypes.object.isRequired,
};

export default ApplicationView;
