import React from "react";
import renderer from "react-test-renderer";

import HomePage from "../../src/homePage/homePage";

describe("HomePage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<HomePage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {

		let component;

		beforeEach(() => {
			component = new HomePage();
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(HomePage);
		});
	});
});
