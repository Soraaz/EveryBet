import React from "react";
import renderer from "react-test-renderer";

import RankingPage from "../../src/rankingPage/rankingPage.js";

describe("RankingPage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<RankingPage/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});
});
