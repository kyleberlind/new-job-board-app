import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EmployerConsoleNavBar = (props) => {
  return (
    <Menu inverted>
      <Menu.Item as={Link} to="/employer/employer-console">
        <Icon name="bars" />
        My Job Postings
      </Menu.Item>
      <Menu.Item as={Link} to="/employer/account">
        <Icon name="user" />
        Account
      </Menu.Item>
      <Menu.Item>
        <Button
          inverted
          fluid
          onClick={() => {
            props.setShowCreateJobPostingModal(true);
          }}
        >
          <Icon name="compose" />
          Create Job Posting
        </Button>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button inverted fluid onClick={props.handleLogout}>
            <Icon name="log out" />
            Logout
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default EmployerConsoleNavBar;
