const supertest = require('supertest');
const app = require('../start');
const Search = new (require('../models/Search'));

describe("Routers test", () => {
	it("should return ok", async (done) => {
		const response = await supertest(app)
			.post('/api/mercadolivre/search')
			.send({
				search: "chave", 
				limit: 1
		    })

		expect(response.status).toBe(200);
		done();
	});

	it("should return bad request", async (done) => {
		const response = await supertest(app)
			.post('/api/mercadolivre/search')
			.send({
				limit: 1
		    })

		expect(response.status).toBe(400);
		done();
	});	
});