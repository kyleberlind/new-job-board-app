import React, { useState } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { checkoutJobCart } from "../../../services/applicant/ApplicantServices.js";
import {
  Item,
  Button,
  Container,
  Segment,
  Grid,
  Icon,
} from "semantic-ui-react";
import { REMOVE_JOB_POSTING_FROM_CART_MUTATION } from "../../../services/graphql/mutations/ApplicantMutations";
import {
  getSuccessToastWithMessage,
  getFailureToastWithMessage,
} from "../../shared/toast/ToastOptions";

const ApplicantJobCart = (props) => {
  const [jobCart, setJobCart] = useState([]);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);

  const [removeJobPostingFromCart, { mutationData }] = useMutation(
    REMOVE_JOB_POSTING_FROM_CART_MUTATION
  );

  const onCheckoutClick = () => {
    checkoutJobCart().then((response) => {
      response.json().then((data) => {
        if (!data["hasError"]) {
          setCheckoutSuccessful(true);
          setJobCart([]);
        } else {
          console.log("error checking out"); // TODO add error handling
        }
      });
    });
  };

  const generateJobPostings = () => {
    return props.jobCart.length > 0 ? (
      props.jobCart.map((job) => {
        return (
          <Item key={job.jobPosting.id}>
            <Item.Content>
              <Item.Header>{job.jobPosting.role}</Item.Header>
              <Item.Meta>{job.jobPosting.employer.employerName}</Item.Meta>
              <Item.Meta>
                {job.jobPosting.location.city +
                  ", " +
                  job.jobPosting.location.state}
              </Item.Meta>
            </Item.Content>
            <Button
              floated="right"
              basic
              color="red"
              onClick={() => {
                handleRemoveJobFromCart(job.jobPosting.id);
              }}
            >
              Remove
            </Button>
          </Item>
        );
      })
    ) : (
      <Item>No Job Postings in Cart</Item>
    );
  };

  const handleRemoveJobFromCart = (selectedJobPostingId) => {
    removeJobPostingFromCart({
      variables: {
        jobPostingId: selectedJobPostingId,
      },
    })
      .then(() => {
        props.removeJobFromCart(selectedJobPostingId);
        props.openToast(
          getSuccessToastWithMessage("Successfully removed job from cart.")
        );
      })
      .catch((error) => {
        console.log(error);
        props.openToast(
          getFailureToastWithMessage("Failed to add job to cart")
        );
      });
  };

  return (
    <Container fluid>
      <Segment>
        <Grid columns={2}>
          <Grid.Column>
            <Item.Group divided>{generateJobPostings()}</Item.Group>
          </Grid.Column>
          <Grid.Column>
            {props.jobCart.length > 0 ? (
              <Button fluid color="green" onClick={onCheckoutClick}>
                Checkout
              </Button>
            ) : null}
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openToast: (toast) => dispatch({ type: "OPEN_TOAST", payload: toast }),
    removeJobFromCart: (jobPostingId) =>
      dispatch({ type: "REMOVE_JOB_FROM_CART", payload: jobPostingId }),
  };
};

const mapStateToProps = (state) => {
  return {
    jobCart: state.applicant.jobCart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantJobCart);
