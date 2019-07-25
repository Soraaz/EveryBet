import React from "react";
import renderer from "react-test-renderer";

import EditProfilePage from "../../src/editProfilePage/editProfilePage.js";

describe("EditProfilePage", () => {

	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<EditProfilePage/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});
});
