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
const email = "j@google.com";
const fullName = "John Rogers";
const phone = "2817874098";

const selctors = {
  base: "RequestForm",
  title: "RequestForm__title",
  method: "RequestForm__method",
  url: "RequestForm__url",
  body: "RequestForm__body",
  bodyField: "RequestForm__bodyField",
  response: "RequestForm__response",
  resetButton: "RequestForm__resetButton",
  submitButton: "RequestForm__submitButton",
  loading: "RequestForm__loading",
  error: "RequestForm__error",
};

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

describe(`EndpointExplorer`, () => {
  it(`Can reset the form`, () => {
    cy.log("Load page");
    loadPage();

    validateForm({
      email: "",
      fullName: "",
      phone: "",
    });

    cy.log("Enter an invalid email");
    enterEmail(email);
    enterFullName(fullName);
    enterPhone(phone);

    validateForm({
      email,
      fullName,
      phone,
    });

    cy.log("Click to reset the form");
    resetForm();

    validateForm({
      email: "",
      fullName: "",
      phone: "",
    });
  });

  it(`Can submit new requests`, () => {
    cy.log("Load page");
    loadPage();

    cy.log("Complete form");
    enterEmail(email);
    enterFullName(fullName);
    enterPhone(phone);

    cy.log("Submit form");
    cy.intercept({ url: endpoints[0].url }).as("newUser");
    select(selctors.loading).should("not.exist");
    submitForm();

    cy.log("Expect a loading indication");
    select(selctors.loading).contains("Loading");

    cy.log("Expect the request to be correct");
    cy.wait("@newUser").should((interception) => {
      expect(interception.request.url).to.equal(endpoints[0].url);
      expect(interception.request.method).to.equal(endpoints[0].method);
      expect(interception.request.body).to.deep.equal({
        email,
        fullName,
        phone,
      });
    });
    select(selctors.loading).should("not.exist");

    cy.log("Expect the response to display correctly");
    select(selctors.response).contains(
      `{"email":"j@google.com","fullName":"John Rogers","phone":"2817874098","id":11}`
    );
  });

  it(`Handles submission errors`, () => {
    cy.log("Load page");
    loadPage();

    cy.log("Complete form");
    enterEmail(email);
    enterFullName(fullName);
    enterPhone(phone);

    cy.log("Submit form");
    cy.intercept({ url: endpoints[0].url }, { statusCode: 500 }).as("newUser");
    select(selctors.loading).should("not.exist");
    submitForm();

    cy.log("Expect the request to be correct");
    cy.wait("@newUser").should((interception) => {
      expect(interception.request.url).to.equal(endpoints[0].url);
      expect(interception.request.method).to.equal(endpoints[0].method);
      expect(interception.request.body).to.deep.equal({
        email,
        fullName,
        phone,
      });
    });
    select(selctors.loading).should("not.exist");

    cy.log("Expect the response to display correctly");
    select(selctors.error).contains("An error occurred");
  });
});

function validateForm({
  email,
  phone,
  fullName,
}: {
  email: string;
  fullName: string;
  phone: string;
}) {
  cy.log("Expect the default value to be empty");
  select(`${selctors.bodyField} email`)
    .find("input")
    .should("have.value", email);
  select(`${selctors.bodyField} full-name`)
    .find("input")
    .should("have.value", fullName);
  select(`${selctors.bodyField} phone`)
    .find("input")
    .should("have.value", phone);
}
function enterEmail(email: string) {
  select(`${selctors.bodyField} email`).type(email);
}
function enterFullName(fullName: string) {
  select(`${selctors.bodyField} full-name`).type(fullName);
}
function enterPhone(phone: string) {
  select(`${selctors.bodyField} phone`).type(phone);
}
function resetForm() {
  select(selctors.resetButton).click();
}
function submitForm() {
  select(selctors.submitButton).click();
}
