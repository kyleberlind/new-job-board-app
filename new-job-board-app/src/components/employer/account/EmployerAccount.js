import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Table, Container, Loader } from "semantic-ui-react";

const EmployerAccount = (props) => {
  return (
    <Container fluid>
      {Object.keys(props.employer).length !== 0 ? (
        <Card fluid>
          <Card.Content header={props.employer.employerName} />
          <Card.Content>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={2}>ID</Table.Cell>
                  <Table.Cell>{props.employer.employerId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email Address</Table.Cell>
                  <Table.Cell>{props.employer.employerEmailAddress}</Table.Cell>
                  <Table.Cell width={2}>
                    <Button>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Size</Table.Cell>
                  <Table.Cell>{props.employer.employerSize}</Table.Cell>
                  <Table.Cell>
                    <Button>Edit</Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Account Created</Table.Cell>
                  <Table.Cell>{props.employer.signUpDate}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      ) : (
        <Loader active />
      )}
    </Container>
  );
};

EmployerAccount.propTypes = {
  employer: PropTypes.object.isRequired,
};

export default EmployerAccount;
