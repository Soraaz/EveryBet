import React from "react";
import renderer from "react-test-renderer";

import ContactPage from "../../src/contactPage/contactPage";

describe("ContactPage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<ContactPage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});
});