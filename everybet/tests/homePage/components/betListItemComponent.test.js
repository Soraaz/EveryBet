import React from "react";
import {Platform, TouchableNativeFeedback, TouchableOpacity} from "react-native";
import renderer from "react-test-renderer";
import {shallow} from "enzyme";

import BetListItemComponent from "../../../src/homePage/components/betListItemComponent";

describe("betListItemComponent", () => {
	let bet;
	let categories;

	beforeAll(() => {
		bet = {
			"answers": [{
				"answer": "Et harum quidem rerum",
				"betId": 1,
				"id": 1,
			}, {
				"answer": "Sint modo partes vitae beatae",
				"betId": 1,
				"id": 2,
			}, {
				"answer": "Itaque rursus eadem ratione",
				"betId": 1,
				"id": 3,
			}],
			"categories": [],
			"coinsRedistributed": 0,
			"correctAnswerId": null,
			"deadline": 1893452400,
			"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si verbum sequimur, primum longius verbum praepositum quam bonum. Dolor ergo, id est summum malum, metuetur semper, etiamsi non aderit; Peccata paria.",
			"finished": 0,
			"id": 1,
			"name": "Loripsum",
			"reported": 0,
			"validate": 1,
			"open": false
		};

		categories = [{
			"icon": "art.png",
			"id": 1,
			"name": "Art",
		}, {
			"icon": "space.png",
			"id": 2,
			"name": "Espace",
		}, {
			"icon": "finance.png",
			"id": 3,
			"name": "Finance",
		}, {
			"icon": "fun.png",
			"id": 4,
			"name": "Fun",
		}, {
			"icon": "video_games.png",
			"id": 5,
			"name": "Jeux Vidéos",
		}, {
			"icon": "literature.png",
			"id": 6,
			"name": "Littérature",
		}, {
			"icon": "news.png",
			"id": 7,
			"name": "News",
		}, {
			"icon": "numeric.png",
			"id": 8,
			"name": "Numérique",
		}, {
			"icon": "people.png",
			"id": 9,
			"name": "People",
		}, {
			"icon": "politics.png",
			"id": 10,
			"name": "Politique",
		}, {
			"icon": "science.png",
			"id": 11,
			"name": "Sciences",
		}, {
			"icon": "sport.png",
			"id": 12,
			"name": "Sport",
		}];
	});

	describe("rendering", () => {
		it("Should not render a bet if the filter doesn't exist", () => {
			const tree = renderer
				.create(
					<BetListItemComponent
						onPress={() => {}}
						onAnswer={() => {}}
						bet={bet}
						categoryList={categories}
						filter={"test"}
					/>
				)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		describe("android", () => {
			beforeAll(() => {
				Platform.OS = "android";
			});

			beforeEach(() => {
				bet.categories = [];
				bet.open = false;
			});

			it("Should render a bet with the description closed and no category icon on android", () => {
				const tree = renderer
					.create(
						<BetListItemComponent
							onPress={() => {}}
							onAnswer={() => {}}
							bet={bet}
							categoryList={categories}
							filter={"Toutes"}
						/>
					)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet with the description closed and its category icon on android", () => {
				bet.categories = categories;
				const tree = renderer
					.create(
						<BetListItemComponent
							onPress={() => {}}
							onAnswer={() => {}}
							bet={bet}
							categoryList={categories}
							filter={"Toutes"}
						/>
					)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			/*			it("Should render a bet with the description opened and no category icon on android", () => {
							bet.open = true;
							const tree = renderer
								.create(
									<BetListItemComponent
										onPress={() => {}}
										onAnswer={() => {}}
										bet={bet}
										categoryList={categories}
										filter={"Toutes"}
									/>
								)
								.toJSON();
							expect(tree).to.matchSnapshot();
						});

						it("Should render a bet with the description opened and its category icon on android", () => {
							bet.categories = categories;
							bet.open = true;
							const tree = renderer
								.create(
									<BetListItemComponent
										onPress={() => {}}
										onAnswer={() => {}}
										bet={bet}
										categoryList={categories}
										filter={"Toutes"}
									/>
								)
								.toJSON();
							expect(tree).to.matchSnapshot();
						});*/
		});

		describe("ios", () => {
			beforeAll(() => {
				Platform.OS = "ios";
			});

			beforeEach(() => {
				bet.categories = [];
				bet.open = false;
			});

			it("Should render a bet with the description closed and no category icon on ios", () => {
				const tree = renderer
					.create(
						<BetListItemComponent
							onPress={() => {}}
							onAnswer={() => {}}
							bet={bet}
							categoryList={categories}
							filter={"Toutes"}
						/>
					)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			it("Should render a bet with the description closed and its category icon on ios", () => {
				bet.categories = [{
					"id": 11,
					"name": "Sport",
					"icon": "sport.png"
				}];
				const tree = renderer
					.create(
						<BetListItemComponent
							onPress={() => {}}
							onAnswer={() => {}}
							bet={bet}
							categoryList={categories}
							filter={"Toutes"}
						/>
					)
					.toJSON();
				expect(tree).to.matchSnapshot();
			});

			/*			it("Should render a bet with the description opened and no category icon on ios", () => {
							bet.open = true;
							const tree = renderer
								.create(
									<BetListItemComponent
										onPress={() => {}}
										onAnswer={() => {}}
										bet={bet}
										categoryList={categories}
										filter={"Toutes"}
									/>
								)
								.toJSON();
							expect(tree).to.matchSnapshot();
						});

						it("Should render a bet with the description opened and its category icon on ios", () => {
							bet.categories = categories;
							bet.open = true;
							const tree = renderer
								.create(
									<BetListItemComponent
										onPress={() => {}}
										onAnswer={() => {}}
										bet={bet}
										categoryList={categories}
										filter={"Toutes"}
									/>
								)
								.toJSON();
							expect(tree).to.matchSnapshot();
						});*/
		});
	});

	describe("functionalities", () => {
		let onPress;
		let wrapper;

		beforeEach(() => {
			onPress = sinon.spy();
			wrapper = shallow(
				<BetListItemComponent
					onPress={onPress}
					onAnswer={() => {}}
					bet={bet}
					categoryList={categories}
					filter={"Toutes"}
				/>
			);
		});

		describe("android", () => {
			beforeAll(() => {
				Platform.OS = "android";
			});

			it("Should call the callback if bet is pressed on android", () => {
				expect(onPress).to.be.not.called;
				wrapper.find(TouchableNativeFeedback).first().props().onPress();
				expect(onPress).to.be.calledOnce;
			});
		});

		describe("ios", () => {
			beforeAll(() => {
				Platform.OS = "ios";
			});

			it("Should call the callback if bet is pressed on ios", () => {
				expect(onPress).to.be.not.called;
				wrapper.find(TouchableOpacity).first().props().onPress();
				expect(onPress).to.be.calledOnce;
			});
		});
	});
});
