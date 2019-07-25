import React from "react";
import renderer from "react-test-renderer";

import AvatarComponent from "../../../src/editProfilePage/components/avatarComponent.js";

describe("AvatarComponent", () => {
	let onAvatarChange = jest.fn();

	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<AvatarComponent onAvatarChange={onAvatarChange}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		let component;

		beforeEach(() => {
			component = new AvatarComponent();
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(AvatarComponent);
		});

		/*		it("Should be testing askPermissions", (done) => {
					component.askPermission();
						expect(component).to.be.an.instanceOf(AvatarComponent);
				});*/
	});
});
