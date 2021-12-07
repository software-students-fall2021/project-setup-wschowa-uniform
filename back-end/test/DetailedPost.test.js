const assert = require("assert")
const expect = require("chai").expect
const request = require("supertest")
const should = require("should")
const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

describe("unit testing on the GET /seepost?id={post id} route", function () {
	// it("should return OK status", function () {
	// 	const post_id = 25
	// 	return request(app)
	// 		.get("/seepost?")
	// 		.then(function (res) {
	// 			assert.equal(res.status, 200)
	// 		})
	// })
	// it("should return a json object that contains the information of {post id} post", function () {
	//     const post_id = 25
	//     return request(app)
	//         .get("/seepost?id=" + post_id)
	//         .then(function (res) {
	//             //the res.body should be a json object
	//             res.body.should.be.a("Object")
	//             //the property that a user can alter
	//             res.body.should.have.property("id")
	//             res.body.should.have.property("name")
	//             res.body.should.have.property("description")
	//             res.body.should.have.property("music1")
	//             res.body.should.have.property("music2")
	//         })
	// })
})

describe("unit testing on the POST /seepost?id={post id} route", function () {
	const newComment = {
		id: 1,
		comment: "This is a new comment",
		username: "Laura",
		isReply: false,
	}
	it("should return OK status", function () {
		const post_id = 1
		return request(app)
			.post("/seepost?id=" + post_id)
			.send(newComment)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	// it("should return a json object that contains the new comment", function () {
	//     const post_id = 1
	//     return request(app)
	//         .post("/seepost?id=" + post_id)
	//         .send(newComment)
	//         .then(function (res) {
	//             //the res.body should be a json object
	//             res.body.should.be.a("Object")
	//             //the property of a comment object
	//             res.body.should.have.property("id")
	//             res.body.should.have.property("comment")
	//             res.body.should.have.property("username")
	//             res.body.should.have.property("isReply")
	//             //res.body.should.have.property("date")
	//         })
	// })
})
