import React from "react";
import {NavigationEvents} from "react-navigation";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";


import UserBetsPage from "../../src/userBetsPage/userBetsPage";

describe("UserBetsPage", () => {
	const navigation = {
		navigate: jest.fn(x => x),
		state: {params: {type: "type"}}
	};

	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<UserBetsPage navigation={navigation}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<UserBetsPage navigation={navigation}/>);
		});

		it("Should call the callback increasing the close state", () => {
			expect(wrapper.instance().state.close).to.be.equal(0);
			wrapper.find(NavigationEvents).first().props().onWillFocus();
			expect(wrapper.instance().state.close).to.be.equal(1);
		});
	});
});