import React from "react";

import "./App.css";
import { EndpointConfiguration } from "./EndpointConfiguration";
import { EndpointExplorer } from "./EndpointExplorer";

export const example: EndpointConfiguration = {
  title: "Create new user",
  url: "https://jsonplaceholder.typicode.com/users/",
  method: "POST",
  body: [
    {
      name: "email",
      type: "email",
      max: 24,
      min: 3,
    },
    {
      name: "full-name",
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
    {
      name: "phone",
      type: "tel",
    },
  ],
};
const response = "Response";

function App() {
  return (
    <div className="App">
      <EndpointExplorer endpointConfiguration={example} />
    </div>
  );
}

export default App;
