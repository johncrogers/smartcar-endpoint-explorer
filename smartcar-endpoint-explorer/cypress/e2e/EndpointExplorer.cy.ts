const testHome = "http://localhost:3000";

function loadPage() {
  cy.visit(testHome);
}

function select(selector: string) {
  return cy.get(`[data-cy="${selector}"]`);
}

export const example = {
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

const selctors = {
  base: "RequestForm",
  title: "RequestForm__title",
  method: "RequestForm__method",
  url: "RequestForm__url",
  body: "RequestForm__body",
  bodyField: "RequestForm__bodyField",
};

describe(`EndpointExplorer`, () => {
  describe(`Display`, () => {
    it(`Displays endpoint configurations correctly`, () => {
      cy.log("Load page");
      loadPage();

      cy.log(
        "Expect the endpoint explorer to display the configuration correctly"
      );
      select(selctors.base).within(() => {
        cy.log("Expect the title to display correctly");
        select(selctors.title).contains(example.title);

        cy.log("Expect the url to display correctly");
        select(selctors.url).contains(example.url);

        cy.log("Expect the method to display correctly");
        select(selctors.method).contains(example.method);

        cy.log("Expect each body field to display correctly");
        select(selctors.body).within(() => {
          select(selctors.bodyField).each((bodyField, bodyFieldIndex) => {
            cy.log("Expect the email to display correctly");
            const fieldConfigurationProperties = Object.entries(
              example.body[bodyFieldIndex]
            );
            cy.wrap(bodyField).within(() => {
              fieldConfigurationProperties.forEach(
                ([propertyName, propertyValue]) => {
                  cy.get("input").should(
                    "have.a.attr",
                    propertyName,
                    typeof propertyValue === "boolean"
                      ? propertyName
                      : propertyValue
                  );
                }
              );
            });
          });
        });
      });
    });
  });

  describe(`Validation`, () => {
    it(`Requires valid emails`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Enter invalid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Enter a valid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to disappear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be enabled");
      cy.contains("break", { timeout: 0 });
    });

    it(`Requires valid full names`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Enter invalid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Enter a valid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to disappear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be enabled");
      cy.contains("break", { timeout: 0 });
    });

    it(`Requires valid phone numbers`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Enter invalid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be disabled");
      cy.contains("break", { timeout: 0 });

      cy.log("Enter a valid value");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect validation to disappear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the correct validation message to appear");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the submission button to be enabled");
      cy.contains("break", { timeout: 0 });
    });
  });

  describe(`Submission`, () => {
    it(`Can reset the form`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Complete form");
      cy.contains("break", { timeout: 0 });

      cy.log("Click to reset the form");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect each body field to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the email to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the full name to display correctly");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the phone to display correctly");
      cy.contains("break", { timeout: 0 });
    });

    it(`Can submit new requests`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Complete form");
      cy.contains("break", { timeout: 0 });

      cy.log("Submit form");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the request to be correct");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the response to display correctly");
      cy.contains("break", { timeout: 0 });
    });

    it(`Handles submission errors`, () => {
      cy.log("Load page");
      loadPage();

      cy.log("Complete form");
      cy.contains("break", { timeout: 0 });

      cy.log("Submit form and respond with an error");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the request to be correct");
      cy.contains("break", { timeout: 0 });

      cy.log("Expect the message to be correct");
      cy.contains("break", { timeout: 0 });
    });
  });
});
