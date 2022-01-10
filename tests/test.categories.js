process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const server = require("../server"); // runs upon import
const { assertInternalError, loginAsAdmin } = require("./testUtils");

// import model
const CategoryModel = require("../models/Category");
const UserModel = require("../models/User");

// import data
const users = require("./data/users");

describe("Category Routes", () => {
  before(function () {
    //
  });

  describe("GET /api/categories/ => Show all categories", async function () {
    let category1;
    let category2;
    beforeEach(async function () {
      await UserModel.deleteMany();
      await UserModel.insertMany(users);
      await CategoryModel.deleteMany();

      // create a few categories
      // login
      const loginData = await loginAsAdmin();
      loginData.should.have.property("token");
      var adminToken = loginData.token;

      const result1 = await chai
        .request(server)
        .post("/api/admin/categories")
        .set("Authorization", "Bearer " + adminToken)
        .send({
          name: "Electronics",
          description: "Anything that uses electricity",
        });

      const result2 = await chai
        .request(server)
        .post("/api/admin/categories")
        .set("Authorization", "Bearer " + adminToken)
        .send({
          name: "Clothes",
          description: "Things that people wear",
        });

      category1 = result1.body;
      category2 = result2.body;
    });

    it("should be successful", async () => {
      const result = await chai.request(server).get("/api/categories/");

      assertInternalError(result);
      result.should.have.status(200);
      result.should.be.json;

      const data = [...result.body];
      data.should.be.a("array");
      data.length.should.not.equal(0);
      data.length.should.equal(2);
      data.map((item) => {
        item.should.have.property("name");
      });
    });
  });

  describe("POST /api/admin/categories => Create a new category", () => {
    beforeEach(async function () {
      await UserModel.deleteMany({
        email: {
          $ne: process.env.SUPER_ADMIN_ID,
        },
      });
      await UserModel.insertMany(users);
      await CategoryModel.deleteMany();
    });

    // it("should return error when signed in as regular user", async () => {
    //   // login
    //   const loginData = await loginAsRegulerUser();

    //   loginData.should.have.property("token");
    //   var token = loginData.token;

    //   const result = await chai
    //     .request(server)
    //     .post("/api/admin/categories")
    //     .set("Authorization", "Bearer " + token)
    //     .send({
    //       name: "Electronics",
    //       description: "Anything that uses electricity",
    //     });

    //   result.should.have.status(401);
    //   result.should.be.json;
    //   const data = { ...result.body };
    //   shouldBeAnErrorObject(data);
    // });

    // it("should be successful when signed in as an admin", async () => {
    //   // login
    //   const loginData = await loginAsAdmin();
    //   loginData.should.have.property("token");
    //   var token = loginData.token;

    //   const result = await chai
    //     .request(server)
    //     .post("/api/admin/categories")
    //     .set("Authorization", "Bearer " + token)
    //     .send({
    //       name: "Electronics",
    //       description: "Anything that uses electricity",
    //     });

    //   result.should.have.status(201);
    //   result.should.be.json;
    //   const data = [...result.body];
    //   data[0].should.have.property("name");
    //   data[0].should.have.property("description");
    // });

    // it("should be successful when description is not provided", async () => {
    //   // login
    //   const loginData = await loginAsAdmin();
    //   loginData.should.have.property("token");
    //   var token = loginData.token;

    //   const result = await chai
    //     .request(server)
    //     .post("/api/admin/categories")
    //     .set("Authorization", "Bearer " + token)
    //     .send({
    //       name: "Electronics",
    //     });

    //   result.should.have.status(201);
    //   result.should.be.json;
    //   const data = [...result.body];
    //   data[0].should.have.property("name");
    // });
  });
});
