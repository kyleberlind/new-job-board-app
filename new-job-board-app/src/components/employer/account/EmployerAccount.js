import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button, Table, Container, Loader } from "semantic-ui-react";
import EditAccountInfoModal from "./modals/EditAccountInfoModal";
const EmployerAccount = (props) => {
  const [isEditAccountInfoModalOpen, setIsEditAccountInfoModalOpen] = useState(
    false
  );
  const [editType, setEditType] = useState("");

  return (
    <Container fluid>
      {Object.keys(props.employer).length !== 0 ? (
        <Card fluid>
          <Card.Content header={props.employer.employerName} />
          <Card.Content>
            <Table definition>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={2}>Employer ID</Table.Cell>
                  <Table.Cell>{props.employer.employerId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={2}>Account ID</Table.Cell>
                  <Table.Cell>{props.employer.userId}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email Address</Table.Cell>
                  <Table.Cell>{props.employer.employerEmailAddress}</Table.Cell>
                  <Table.Cell width={2}>
                    <Button
                      fluid
                      onClick={() => {
                        setEditType("emailAddress");
                        setIsEditAccountInfoModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Password</Table.Cell>
                  <Table.Cell>*************</Table.Cell>
                  <Table.Cell width={2}>
                    <Button
                      fluid
                      onClick={() => {
                        setEditType("password");
                        setIsEditAccountInfoModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Size</Table.Cell>
                  <Table.Cell>{props.employer.employerSize}</Table.Cell>
                  <Table.Cell>
                    <Button
                      fluid
                      onClick={() => {
                        setEditType("size");
                        setIsEditAccountInfoModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Account Created</Table.Cell>
                  <Table.Cell>{props.employer.signUpDate}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Card.Content>
          <EditAccountInfoModal
            isEditAccountInfoModalOpen={isEditAccountInfoModalOpen}
            setIsEditAccountInfoModalOpen={setIsEditAccountInfoModalOpen}
            editType={editType}
            employer={props.employer}
          />
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
