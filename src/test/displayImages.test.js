const request = require("supertest");
const { expect } = require("chai");
const app = require("../../index");

describe("Retrieve and Display Images from Database", () => {
  it("should retrieve and display images from the database", (done) => {
    request(app)
      .get("/display-images")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
