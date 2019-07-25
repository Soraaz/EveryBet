import React from "react";
import {Platform} from "react-native";
import {shallow} from "enzyme";

import OrderFilter from "../../../src/common/components/orderFilter";
import renderer from "react-test-renderer";

describe("OrderFilter", () => {
	describe("rendering", () => {
		/*		describe("android", () => {
					beforeAll(() => {
						Platform.OS = "android";
					});

					it("Should render correctly", () => {
						const tree = renderer
							.create(<OrderFilter filterCallback={() => {}}/>)
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
					.create(<OrderFilter filterCallback={() => {}}/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});
		});
	});

	describe("functionalities", () => {
		it("Should set state on mount", (done) => {
			const wrapper = shallow(<OrderFilter filterCallback={() => {}}/>);
			process.nextTick(() => {
				wrapper.update();
				expect(wrapper.state("orderList").length).to.equal(3);
				done();
			});
		});

		it("Should set state on change order", (done) => {
			const wrapper = shallow(<OrderFilter filterCallback={() => {}}/>);
			wrapper.instance()._changeOrder("Populaires");
			process.nextTick(() => {
				wrapper.update();
				expect(wrapper.state("order")).to.equal("Populaires");
				done();
			});
		});
	});
});
