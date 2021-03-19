import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
function EmployerConsoleNavBar(props) {


  return (
    <Menu inverted>
      <Menu.Item name="My Job Postings" as={Link} to="/employer/employer-console" />
      <Menu.Item name="Account" as={Link} to="/employer/account"></Menu.Item>
      <Menu.Item
        name="Create Job Posting"
        onClick={() => {
          props.setShowCreateJobPostingModal(true);
        }}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button fluid onClick={props.handleLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default EmployerConsoleNavBar;
