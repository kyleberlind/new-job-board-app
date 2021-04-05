import React from "react";
import "./css/HomeNavBar.css";
import { Menu, Button, Icon } from "semantic-ui-react";

const HomeNavBar = (props) => {
  return (
    <Menu inverted>
      <Menu.Item name="Applomb" href="/" />
      <Menu.Menu position="right">
        <Menu.Item>
          <Button inverted fluid href="/signup">
            <Icon name="signup"></Icon>
            Sign Up
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button inverted fluid href="/login">
            Login
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HomeNavBar;
