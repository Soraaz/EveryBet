import React from "react";
import renderer from "react-test-renderer";
import {shallow} from "enzyme/build";

import LoginComponent from "../../../src/profilePage/components/loginComponent.js";
import Button from "../../../src/common/components/button";

describe("LoginComponent", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<LoginComponent />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		const navigation = {navigate: jest.fn(x => x)};
		let wrapper;

		beforeEach(() => {
			wrapper = shallow(<LoginComponent navigation={navigation} />);
		});

		it("Should navigate to Register when pressing \"Register\"", () => {
			expect(wrapper.find(Button).first().props().onPress()).to.be.equal('Register');
		});
	});
});
