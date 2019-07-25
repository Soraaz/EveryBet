import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import mocha from 'mocha';

import app from '../../src/Routes/HttpServer';
import * as Config from '../../config.json';

chai.use(chaiHttp);

mocha.describe('BaseRoute', () => {
	mocha.it("should be json", async () => {
		const res = await chai.request(app).get("/").set('Authorization', `bearer ${Config.server.bearerToken}`);
		expect(res.status).to.eql(200);
		expect(res.type).to.eql("application/json");
		expect(res.body.message).to.eql("Api is running !");
	});
});