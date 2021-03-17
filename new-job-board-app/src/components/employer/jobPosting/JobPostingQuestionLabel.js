import { Label, Checkbox, Icon } from "semantic-ui-react";

const JobPostingQuestionLabel = (props) => {
  return (
    <Label horizontal>
      <Label.Group>
        {props.questionTitle}
        <Icon
          link
          onClick={() => props.removeJobPostingField(props.value)}
          name="delete"
        />
        <Label.Detail>
          <Checkbox
            checked={props.checked}
            onChange={() => {
              props.makeJobPostingFieldRequired(props.value);
            }}
            label="Required"
          />
        </Label.Detail>
      </Label.Group>
    </Label>
  );
};

export default JobPostingQuestionLabel;
