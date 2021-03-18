import React from "react";
import "./css/ApplicantConsole.css";

import { Menu, Button } from "semantic-ui-react";

function ApplicantConsoleNavBar(props) {
  return (
    <Menu inverted>
      <Menu.Item name="New Job Board" href="/applicant/applicant-console" />
      <Menu.Item name="Account" href="/applicant/account" />
      <Menu.Item name="My Applications" href="/applicant/applicant-console" />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button fluid href="/applicant/job-cart">
            Job Cart
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button fluid onClick={props.handleLogout}>
            Logout
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default ApplicantConsoleNavBar;
