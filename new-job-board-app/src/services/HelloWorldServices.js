import React from "react";

export const getHelloWorldMessageService = () => {
  return fetch(
    "/get_hello_world"
  );
}
