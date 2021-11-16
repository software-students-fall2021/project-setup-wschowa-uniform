const assert = require("assert")
const expect = require("chai").expect
const request = require("supertest")
const should = require("should")
const app = require("../app")
const chai = require("chai")
const chaiHttp = require("chai-http")

chai.should()
chai.use(chaiHttp)

// unit testing on the GET /newpost?id={user id} route
describe("unit testing on the GET /newpost?id={post id} route", function () {
	it("should return 200",  () => {
		const id = 1
		return request(app)
			.get("/newpost?id=" + id)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the information of new post", function () {
		const id = 1
		return request(app)
			.get("/newpost?id=" + id)
			.then(function (res) {
				res.body.should.be.a("Object")
				res.body.should.have.property("postID")
				res.body.should.have.property("playlistName")
				res.body.should.have.property("playlistLink")
				res.body.should.have.property("playlistCaption")
			})
	})
})
// unit test on the post of /editprofile?id={user id} route
describe("unit testing on the POST /editprofile?id={user id} route", function () {
	const newpost = {
		id: 1,
		playlistName: "EdSherren",
		playlistLink: "https://open.spotify.com/album/32iAEBstCjauDhyKpGjTuq?si=ff8114d0304c4bc0",
		playlistCaption: "I like the first debut song Bad Habit most!",
    		}
	it("should return 200 OK status", function () {
		const id = 1
		return request(app)
			.post("/newpost?id=" + id)
			.send(newpost)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the new information of {user id} user", function () {
		const id = 1
		return request(app)
			.post("/newpost?id=" + id)
			.send(profile)
			.then(function (res) {
				//the res.body should be a json object
				res.body.should.be.a("Object")
				//the property that a user can alter
				res.body.should.have.property("postID")
				res.body.should.have.property("playlistName")
				res.body.should.have.property("playlistLink")
				res.body.should.have.property("playlistCaption")
			})
	})
})


