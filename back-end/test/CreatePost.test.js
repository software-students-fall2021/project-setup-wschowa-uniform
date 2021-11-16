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
		const id = 7
		return request(app)
			.get("/newpost?id=" + id)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
})

describe("unit testing on the POST /newpost?id={postID} route", function () {
	const newpost = {
		id: 7,
		playlistName: "EdSherren",
		playlistLink: "https://open.spotify.com/album/32iAEBstCjauDhyKpGjTuq?si=ff8114d0304c4bc0",
		playlistCaption : "I like the first debut song Bad Habit most!",
    		}
	it("should return 200 OK status", function () {
		const id = 7
		return request(app)
			.post("/newpost?id=" + id)
			.send(newpost)
			.then(function (res) {
				assert.equal(res.status, 200)
			})
	})
	it("should return a json object that contains the new post of id post", function () {
		const id = 7
		return request(app)
			.post("/newpost?id=" + id)
			.send(newpost)
			.then(function (res) {
				res.body.should.be.a("Object")
				res.body.should.have.property("postID")
				res.body.should.have.property("playlistName")
				res.body.should.have.property("playlistLink")
				res.body.should.have.property("playlistCaption")
			})
	})
})


