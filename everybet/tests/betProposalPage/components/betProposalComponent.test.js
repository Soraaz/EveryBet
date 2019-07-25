import React from "react";
import {shallow} from "enzyme/build";
import BetsService from "../../../services/BetsService.js";

import BetProposalComponent, {Deadline, Name, Description, Category, Answer, Answers} from "../../../src/betProposalPage/components/betProposalComponent";

describe("BetProposalComponent", () => {
	describe("rendering", () => {
		/*        it("should render correctly", () => {
					let registerCallbackSpy = sinon.spy();
					const tree = renderer
						.create(<BetProposalComponent callback={registerCallbackSpy} test={true} />)
						.toJSON();
					expect(tree).to.matchSnapshot();
				});*/
	});

	describe("functionalities", () => {
		let component;
		let cb = sinon.spy();

		beforeAll(() => {
			component = new BetProposalComponent();
			BetsService.createNewBet = jest.fn().mockReturnValue(new Promise(async (resolve) => {
				resolve();
			}));
		});

		it("Should check the name", () => {
			expect(Name("test")).to.be.equal("test");
		});

		it("Should check the description", () => {
			expect(Description("test")).to.be.equal("test");
		});

		it("Should check the category", () => {
			expect(Category(new Array(1, 2, 3))).to.deep.equal(new Array(1, 2, 3));
		});

		it("Should check the answer", () => {
			expect(Answer("test")).to.be.equal("test");
		});

		/*        it("Should check the answers", () => {
					let answer = [Answer("test")];
					let answers = Answers(answer);
					expect(answers).to.deep.equal(answers);
				});*/

		it("Should check the options", () => {
			const wrapper = shallow(<BetProposalComponent callback={cb} />);
			const instance = wrapper.instance();
			instance.options.fields.deadline.config.format(new Date());
		});
	});
});
