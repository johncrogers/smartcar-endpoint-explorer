import React from "react";
import { EndpointExplorer } from "./EndpointExplorer/EndpointExplorer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <EndpointExplorer
        endpointConfiguration={{
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
        }}
      />
    </div>
  );
}

export default App;
