import React from "react";
import renderer from "react-test-renderer";

import TermsPage from "../../src/termsPage/termsPage";

describe("TermsPage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<TermsPage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});
});