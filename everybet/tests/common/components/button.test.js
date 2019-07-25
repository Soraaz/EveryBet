import React from "react";
import {TouchableOpacity} from "react-native";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import Button from "../../../src/common/components/button";

describe("Button", () => {
	describe("rendering", () => {
		it("Should render the normal button", () => {
			const tree = renderer
				.create(
					<Button
						onPress={() => {}}
						type={"normal"}
						text={"text"}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render the small normal button", () => {
			const tree = renderer
				.create(
					<Button
						onPress={() => {}}
						type={"normalSmall"}
						text={"text"}
					/>
				)				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render the success button", () => {
			const tree = renderer
				.create(
					<Button
						onPress={() => {}}
						type={"success"}
						text={"text"}
					/>
				)				.toJSON();
			expect(tree).to.matchSnapshot();
		});
		it("Should render the warning button", () => {
			const tree = renderer
				.create(
					<Button
						onPress={() => {}}
						type={"warning"}
						text={"text"}
					/>
				)				.toJSON();
			expect(tree).to.matchSnapshot();
		});
		it("Should render the send button", () => {
			const tree = renderer
				.create(
					<Button
						onPress={() => {}}
						type={"send"}
						text={"text"}
					/>
				)				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () =>{
		let onPress;
		let wrapper;

		beforeEach(() => {
			onPress = sinon.spy();
			wrapper = shallow(
				<Button
					onPress={onPress}
					type={"normal"}
					text={"text"}
				/>
			);
		});

		it("Should call the callback function onPress", () => {
			expect(onPress).to.be.not.called;
			wrapper.find(TouchableOpacity).first().props().onPress();
			expect(onPress).to.be.calledOnce;
		});
	});
});
