const assert = require("assert")
const expect = require("chai").expect
const request = require("supertest")
const should = require("should")
const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

// unit testing on the GET /signup route
describe("unit testing on the GET /signup route", function () {
	it("should return OK status", function () {
		const user_id = 1
		return request(app)
			.get("/signup")
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
})
// unit test on the post of /signup route
describe("unit testing on the POST /signup route", function () {
	const profile = {
		username: "daniel",
		password: "123456",
		gender: "male",
		birthday: "20020511",
		description: "aaaaaa",
	}
	it("should return OK status", function () {
		const user_id = 1
		return request(app)
			.post("/signup")
			.send(profile)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the information of new user", function () {
		const user_id = 1
		return request(app)
			.post("/signup")
			.send(profile)
			.then(function (res) {
				//the res.body should be a json object
				res.body.should.be.a("Object")
				//the property of a user
				res.body.should.have.property("username")
				res.body.should.have.property("password")
				res.body.should.have.property("gender")
				res.body.should.have.property("birthday")
				res.body.should.have.property("description")
			})
	})
})
