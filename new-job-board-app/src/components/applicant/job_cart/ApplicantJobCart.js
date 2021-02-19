import { Alert, Button, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import {
  loadApplicantInfoService,
} from "../../../services/applicant/ApplicantServices";
import { useFormFields } from "../../../libs/hooks/useFormFields.js";
import { loadJobCart, checkoutJobCart } from "../../../services/applicant/ApplicantServices.js";
import PropTypes from 'prop-types';

import './css/ApplicantJobCart.css';


const ApplicantJobCart = (props) => {
  const [jobCart, setJobCart] = useState([]);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);

  useEffect(() => {
    loadJobCart().then((response) => {
      response.json().then((data) => {
        console.log(data["jobCart"])
        setJobCart(data["jobCart"]);
      });
    });
  }, []);

  const onCheckoutClick = () => {
    checkoutJobCart().then((response) => {
      response.json().then((data) => {
        if (!data["hasError"]) {
          setCheckoutSuccessful(true);
          setJobCart([]);
        }
        else {
          console.log("error checking out"); // TODO add error handling
        }
      });
    });
  }

  return (
    <div>
      <div className="header">
        Job Cart
      </div>
      <div className="jobCartContainer">
        {jobCart.map(job =>
          <Card>
            <Card.Header as="h5">Company Name</Card.Header>
            <Card.Body>
              <Card.Title>{job.generalInfo.role}</Card.Title>
              <Card.Subtitle>{job.location.city + ", " + job.location.state}</Card.Subtitle>
              <Card.Text>
                {job.generalInfo.description}
              </Card.Text>
              <Button variant="outline-primary">Remove from Job Cart</Button>
            </Card.Body>
          </Card>
        )}
      </div>
      {jobCart.length > 0
        ? <Button variant="primary" onClick={onCheckoutClick}>Checkout</Button>
        : null
      }
      {checkoutSuccessful
        ? <Alert variant="success">Successfully applied to jobs</Alert>
        : null
      }
    </div>
  );
};

export default ApplicantJobCart;
