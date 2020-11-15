import React from "react";
describe("HelloWorld component", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("works", () => {
    cy.get("h1").first().should("have.text", "Hello world");
  });
});
