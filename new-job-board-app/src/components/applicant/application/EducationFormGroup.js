import { Container, Form, Divider, Button } from "semantic-ui-react";
import React from "react";

const EducationFormGroup = (props) => {
  const degreeOptions = [
    { key: "BA", text: "BA" },
    { key: "BS", text: "BS" },
  ];

  const isFirstEducation = props.index === 0;

  return (
    <Container>
      <Form.Group widths="equal">
        <Form.Input required label="School" placeholder="Select a School" />
        <Form.Dropdown
          required
          options={degreeOptions}
          label="Degree"
          placeholder="Select a Degree"
          search
          selection
        />
        <Form.Input
          required
          label="Discipline"
          placeholder="Select a Discipline"
        />
      </Form.Group>
      <Form.Group>
        <Form.Input
          required
          label="Start Date"
          width="2"
          placeholder="Start Date"
        />
        <Form.Input
          required
          label="End Date"
          placeholder="End Date"
          width="2"
        />
        {props.index === 0 ? null : <Button content="Remove" />}
      </Form.Group>
      <Divider />
    </Container>
  );
};

export default EducationFormGroup;
