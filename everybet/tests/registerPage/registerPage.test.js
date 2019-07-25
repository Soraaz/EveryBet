import React from "react";
import renderer from "react-test-renderer";

import RegisterPage from "../../src/registerPage/registerPage";

describe("RegisterPage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<RegisterPage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let component;

		beforeEach(() => {
			component = new RegisterPage();
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(RegisterPage);
		});
	});
});
