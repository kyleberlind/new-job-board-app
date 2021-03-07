import React from "react";
import { Menu, Button } from "semantic-ui-react";

function EmployerConsoleNavBar(props) {
  return (
    <Menu inverted>
      <Menu.Item name="Console" href="/employer/employer-console" />
      <Menu.Item name="Account" href="/employer/account" />
      <Menu.Item
        name="Create Job Posting"
        onClick={() => {
          props.setShowCreateJobPostingModal(true);
        }}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button onClick={props.handleLogout}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default EmployerConsoleNavBar;
