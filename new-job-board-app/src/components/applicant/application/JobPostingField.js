import React, { useState } from "react";
import { Form } from "semantic-ui-react";
const JobPostingField = (props) => {
  switch (props.field.type) {
    case "free_text":
      return <Form.Input width={7} required={props.required} label={props.field.value} />;
  }
};

export default JobPostingField;
