import React from "react";

export const getHelloWorldMessage = () => {
  return fetch(
    "/get_hello_world"
  );
}
