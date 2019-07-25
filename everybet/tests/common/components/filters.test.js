import React from "react";
import renderer from "react-test-renderer";

import Filters from "../../../src/common/components/filters.js";

describe("Filters", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(
					<Filters
						categoryCallback={() => {}}
						orderCallback={() => {}}
					/>
				).toJSON();
			expect(tree).to.matchSnapshot();
		});
	});
});
