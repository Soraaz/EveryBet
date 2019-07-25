import React from "react";
import {TouchableWithoutFeedback} from 'react-native';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import Layout from "../../src/layout/layout";
import User from "../../src/classes/user";

describe("layout", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<Layout />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly with a connected user", () => {
			User.coins = 150;
			const tree = renderer
				.create(<Layout />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly with a connected user and a custom avatar", () => {
			User.avatar = "avatar";
			const tree = renderer
				.create(<Layout />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		it("Should navigate to Home pressing the logo", () => {
			const navigation = {navigate: jest.fn(x => x)};
			const wrapper = shallow(<Layout navigation={navigation} />);
			expect(wrapper.find(TouchableWithoutFeedback)).to.have.lengthOf(2);
			expect(wrapper.find(TouchableWithoutFeedback).first().props().onPress()).to.be.equal('Home');
		});

		it("Should navigation to Profile when the user's icon", () => {
			const navigation = {navigate: jest.fn(x => x)};
			const wrapper = shallow(<Layout navigation={navigation} />);
			expect(wrapper.find(TouchableWithoutFeedback).at(1).props().onPress()).to.be.equal('Profile');
		});
	});
});
