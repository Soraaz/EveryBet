import React from "react";
import {Platform, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import UserBetListItemComponent from "../../../src/userBetsPage/components/userBetListItemComponent";

describe("UserBetListItemComponent", () => {
	let bet = {
		"id": 1,
		"name": "TestBet",
		"description": "TestBetDesc",
		"validate": 1,
		"finished": 0,
		"deadline": 1111111,
		"correctAnswerId": 1,
		"coinsRedistributed": 10,
		"answers": [],
		"categories": [],
		"open": false
	};

	let categories = [
		{
			"id": 1,
			"name": "Art",
			"icon": "art.png"
		},
		{
			"id": 2,
			"name": "Finance",
			"icon": "finance.png"
		},
		{
			"id": 11,
			"name": "Sport",
			"icon": "sport.png"
		}];

	describe("rendering", () => {
		it("Should not render a bet if the filter doesn't exist", () => {
			const tree = renderer
				.create(<UserBetListItemComponent
					onPress={() => {}}
					bet={bet}
					categoryList={categories}
					filter={"test"}
					type={"progress"}
				/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		describe("android", () => {
			beforeEach(() => {
				Platform.OS = "android";
				bet.categories = [];
				bet.open = false;
			});

			it("Should render a bet in progress with the description closed and no category icon on android", () => {
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description closed and its category icon on android", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description opened and no category icon on android", () => {
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description opened and its category icon on android", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description closed and no category icon on android", () => {
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description closed and its category icon on android", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description opened and no category icon on android", () => {
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description opened and its category icon on android", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});
		});

		describe("ios", () => {
			beforeEach(() => {
				Platform.OS = "ios";
				bet.categories = [];
				bet.open = false;
			});

			it("Should render a bet in progress with the description closed and no category icon on ios", () => {
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description closed and its category icon on ios", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description opened and no category icon on ios", () => {
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet in progress with the description opened and its category icon on ios", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"progress"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description closed and no category icon on ios", () => {
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description closed and its category icon on ios", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description opened and no category icon on ios", () => {
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet which has ended with the description opened and its category icon on ios", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				bet.open = true;
				const tree = renderer
					.create(<UserBetListItemComponent
						onPress={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"Toutes"}
						type={"historic"}
					/>)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});
		});
	});

	describe("functionalities", () => {
		let spy;
		let wrapper;

		beforeEach(() => {
			spy = sinon.spy();
			wrapper = shallow(<UserBetListItemComponent
				onPress={spy}
				bet={bet}
				categoryList={categories}
				filter={"Toutes"}
				type={"progress"}
			/>);
		});

		describe("android", () => {
			beforeAll(() => {
				Platform.OS = "android";
			});

			it("Should call the callback if bet is pressed on android", () => {
				wrapper.find(TouchableNativeFeedback).first().props().onPress();
				expect(spy).to.be.calledOnce;
			});
		});

		describe("ios", () => {
			beforeAll(() => {
				Platform.OS = "ios";
			});

			it("Should call the callback if bet is pressed on ios", () => {
				Platform.OS = "ios";
				wrapper.find(TouchableOpacity).first().props().onPress();
				expect(spy).to.be.calledOnce;
			});
		});
	});
});
