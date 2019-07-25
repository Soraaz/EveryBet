import React from "react";
import renderer from "react-test-renderer";

import RankingListItemComponent from "../../../src/rankingPage/components/rankingListItemComponent";
import User from "../../../src/classes/user";

import rankingListItemStyle from "../../../src/rankingPage/styleSheets/rankingListItemStyleSheet";

describe("RankingListItemComponent", () => {
	describe("rendering", () => {
		let user = {
			key: "1",
			id: 42,
			login: "login",
			coins: 69,
			avatar: null
		};

		it("Should render correctly the first place", () => {
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the second place", () => {
			user.key = "2";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the third place", () => {
			user.key = "3";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly any place starting the fourth", () => {
			user.key = "4";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the first place with orange border for corresponding id", () => {
			User.id = 42;
			user.key = "1";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the second place with orange border for corresponding id", () => {
			user.key = "2";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the third place with orange border for corresponding id", () => {
			user.key = "3";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly any place starting the fourth with orange border for corresponding id", () => {
			user.key = "4";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the first place with a custom avatar", () => {
			User.id = undefined;
			user.key = "1";
			user.avatar = "avatar";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the second place with a custom avatar", () => {
			user.key = "2";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the third place with a custom avatar", () => {
			user.key = "3";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly any place starting the fourth with a custom avatar", () => {
			user.key = "4";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the first place with orange border for corresponding id and a custom avatar", () => {
			User.id = 42;
			user.key = "1";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the second place with orange border for corresponding id and a custom avatar", () => {
			user.key = "2";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly the third place with orange border for corresponding id and a custom avatar", () => {
			user.key = "3";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});

		it("Should render correctly any place starting the fourth with orange border for corresponding id and a custom avatar", () => {
			user.key = "4";
			const tree = renderer
				.create(<RankingListItemComponent user={user}/>)
				.toJSON();
			expect(tree).to.matchSnapshot();
		});
	});

	describe("functionalities", () => {
		it("Should return the gold style for the first place", () => {
			expect(RankingListItemComponent._rankColor(1)).to.be.equal(rankingListItemStyle.gold);
		});

		it("Should return the silver style for the second place", () => {
			expect(RankingListItemComponent._rankColor(2)).to.be.equal(rankingListItemStyle.silver);
		});

		it("Should return the bronze style for the third place", () => {
			expect(RankingListItemComponent._rankColor(3)).to.be.equal(rankingListItemStyle.bronze);
		});

		it("Should return the white style for any place starting the fourth", () => {
			expect(RankingListItemComponent._rankColor(4)).to.be.equal(rankingListItemStyle.white);
		});
	});
});