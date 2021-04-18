import { connect } from "react-redux";
import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "semantic-ui-react";

function ApplicantAccount(props) {
  return (
    <Container fluid>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>First Name</Table.Cell>
            <Table.Cell>{props.applicant.firstName}</Table.Cell>
            <Table.Cell width={3}>
              <Button fluid>Edit</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={2}>Last Name</Table.Cell>
            <Table.Cell>{props.applicant.lastName}</Table.Cell>
            <Table.Cell width={3}>
              <Button fluid>Edit</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={2}>Email Address</Table.Cell>
            <Table.Cell>{props.applicant.emailAddress}</Table.Cell>
            <Table.Cell width={3}>
              <Button fluid>Edit</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={2}>Phone Number</Table.Cell>
            <Table.Cell>303-748-5436</Table.Cell>
            <Table.Cell width={3}>
              <Button fluid>Edit</Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width={2}>Resume</Table.Cell>
            <Table.Cell>resume_link.csv</Table.Cell>
            <Table.Cell width={3}>
              <Button fluid>Update Resume</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    applicant: state.applicant,
  };
};

export default connect(mapStateToProps)(ApplicantAccount);
