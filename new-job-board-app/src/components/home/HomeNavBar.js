import React from "react";
import "./css/HomeNavBar.css";
import { Menu, Button } from "semantic-ui-react";

const HomeNavBar = (props) => {
  return (
    <Menu inverted>
      <Menu.Item name="New Job Board Application" href="/" />
      <Menu.Item name="Home" href="/" />
      <Menu.Menu position="right">
      <Menu.Item>
          <Button fluid href="/signup">
            Sign Up
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button fluid href="/login">
            Login
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default HomeNavBar;
