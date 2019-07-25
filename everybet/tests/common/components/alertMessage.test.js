import React from "react";
import renderer from "react-test-renderer";

import AlertMessage from "../../../src/common/components/alertMessage.js";

describe("AlertMessage", () => {
	describe("rendering", () => {
		it("Should render correctly", () => {
			const tree = renderer
				.create(<AlertMessage />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly simple alert", () => {
			const tree = renderer
				.create(<AlertMessage
					type={'simple'}
					title={'testTitle'}
					message={'testMessage'} />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly error", () => {
			const tree = renderer
				.create(<AlertMessage
					type={'error'}
					callback={jest.fn()}
					message={'testMessage'} />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly success alert", () => {
			const tree = renderer
				.create(<AlertMessage
					type={'success'}
					title={"testTitle"}
					params={null}
					callback={jest.fn()}
					message={'testMessage'} />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly success two buttons alert", () => {
			const tree = renderer
				.create(<AlertMessage
					type={'successTwoButtons'}
					title={"testTitle"}
					params={null}
					callback={jest.fn()}
					callback2={jest.fn()}
					message={'testMessage'}
					buttonMessage={"buttonMessage"}
					buttonMessage2={"buttonMessage2"}
					param2={null} />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly success two buttons alert", () => {
			const tree = renderer
				.create(<AlertMessage
					type={'simpleError'}
					message={'testMessage'} />)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("funcionalities", () => {
		let component;

		beforeEach(() => {
			component = new AlertMessage();
		});

		it("Should instantiate the class", () => {
			expect(component).to.be.an.instanceOf(AlertMessage);
		});
	});
});
