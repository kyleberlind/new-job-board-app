import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button, Icon } from "semantic-ui-react";

import "./css/ApplicantConsole.css";
function ApplicantConsoleNavBar(props) {
  return (
    <Menu inverted>
      <Menu.Item name="Applomb" as={Link} to="/applicant/applicant-console" />
      <Menu.Item as={Link} to="/applicant/account">
        <Icon name="user" />
        Account
      </Menu.Item>
      <Menu.Item as={Link} to="/applicant/applications">
        <Icon name="bars" />
        My Applications
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button inverted fluid as={Link} to="/applicant/job-cart">
            <Icon name="shopping cart" />
            {props.jobCartCount > 0
              ? `Job Cart (${props.jobCartCount})`
              : "Job Cart"}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button inverted fluid onClick={props.handleLogout}>
            <Icon name="log out" />
            Logout
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default ApplicantConsoleNavBar;
