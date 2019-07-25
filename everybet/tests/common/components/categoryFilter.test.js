import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";
import CategoriesService from "../../../services/CategoriesService";
import CategoriesServiceMock from "../../../services/__mocks__/CategoriesService";

import CategoryFilter from "../../../src/common/components/categoryFilter";
import renderer from "react-test-renderer";

describe("CategoryFilter", () => {
	beforeEach(() => {
		CategoriesService.getAllCategories = CategoriesServiceMock.getAllCategories;
	});

	describe("rendering", () => {
		/*		describe("android", () => {
					beforeAll(() => {
						Platform.OS = "android";
					});

					it("Should render correctly", () => {
						const tree = renderer
							.create(<CategoryFilter filterCallback={() => {
							}}/>)
							.toJSON();
						expect(tree).to.matchSnapshot();
					});
				});
		*/
		describe("ios", () => {
			beforeAll(() => {
				Platform.OS = "ios";
			});

			it("Should render correctly", () => {
				const tree = renderer
					.create(<CategoryFilter filterCallback={() => {}}/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});
		});
	});

	describe("functionalities", () => {
		it("Should set state on mount", (done) => {
			const wrapper = shallow(<CategoryFilter filterCallback={() => {}}/>);
			process.nextTick(() => {
				wrapper.update();
				expect(wrapper.state("categoryList").length).to.equal(12);
				done();
			});
		});

		it("Should set state on change category", (done) => {
			const wrapper = shallow(<CategoryFilter filterCallback={() => {}}/>);
			wrapper.instance()._changeCategory("sport");
			process.nextTick(() => {
				wrapper.update();
				expect(wrapper.state("category")).to.equal("sport");
				done();
			});
		});
	});
});
