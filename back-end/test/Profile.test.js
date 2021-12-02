const assert = require("assert")
const expect = require("chai").expect
const request = require("supertest")
const should = require("should")
const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

// unit testing on the GET /editprofile?id={user id} route
describe("unit testing on the GET /profile?id={user id} route", function () {
	it("should return OK status", function () {
		const user_id = 1
		return request(app)
			.get("/profile?id=" + user_id)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the information of {user id} user", function () {
		const user_id = 1
		return request(app)
			.get("/profile?id=" + user_id)
			.then(function (res) {
				//the res.body should be a json object
				res.body.should.be.a("Object")
				//the property that a user can alter
				res.body.should.have.property("id")
				res.body.should.have.property("first_name")
				res.body.should.have.property("last_name")
				res.body.should.have.property("gender")
				res.body.should.have.property("age")
				res.body.should.have.property("description")
			})
	})
})
// unit test on the post of /editprofile?id={user id} route
describe("unit testing on the POST /editprofile?id={user id} route", function () {
	const profile = {
		id: 1,
		first_name: "Shantee",
		last_name: "Durber",
		gender: "Genderqueer",
		age: 11,
		description:
			"Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.",
	}
	it("should return OK status", function () {
		const user_id = 1
		return request(app)
			.post("/profile?id=" + user_id)
			.send(profile)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the new information of {user id} user", function () {
		const user_id = 1
		return request(app)
			.post("/profile?id=" + user_id)
			.send(profile)
			.then(function (res) {
				//the res.body should be a json object
				res.body.should.be.a("Object")
				//the property that a user can alter
				res.body.should.have.property("id")
				res.body.should.have.property("first_name")
				res.body.should.have.property("last_name")
				res.body.should.have.property("gender")
				res.body.should.have.property("age")
				res.body.should.have.property("description")
			})
	})
})

// unit testing on the GET /editprofile/posts?id={user id} route
describe("unit testing on the GET /profile/posts?id={user id} route", function () {
	it("should return OK status", function () {
		const user_id = 1
		return request(app)
			.get("/profile?id=" + user_id)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
})
