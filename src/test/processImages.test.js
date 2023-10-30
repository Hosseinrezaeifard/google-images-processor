const request = require("supertest");
const { expect } = require("chai");
const app = require("../../index");

describe("Scrape Google Images and Save to Database", () => {
  it("should scrape and save images to the database", (done) => {
    request(app)
      .post("/process-images")
      .send({ query: "kittens", maxImages: 10 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal(
          "Images downloaded and stored in the database successfully."
        );
        done();
      });
  });
});
