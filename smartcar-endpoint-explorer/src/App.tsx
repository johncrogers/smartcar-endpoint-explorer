import React from "react";
import { EndpointExplorer } from "./EndpointExplorer/EndpointExplorer";

import "./App.css";

const endpoints = [
  {
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
  },
  // {
  //   title: "Get users",
  //   url: "https://jsonplaceholder.typicode.com/users",
  //   method: "GET",
  // },
];

function App() {
  return (
    <div className="App">
      {endpoints.map((endpointConfiguration) => {
        return (
          <EndpointExplorer
            key={endpointConfiguration.url}
            endpointConfiguration={endpointConfiguration}
          />
        );
      })}
    </div>
  );
}

export default App;
