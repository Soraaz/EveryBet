"use strict";

// modules
import React, {Component} from "react";
import {FlatList, Text, View} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import BetsService from "../../../services/BetsService";
import CategoriesService from "../../../services/CategoriesService";

// components
import User from "../../classes/user";
import AlertMessage from "../../common/components/alertMessage";
import Button from "../../common/components/button";
import BetListItemComponent from "./betListItemComponent";
import Filters from "../../common/components/filters";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";

class BetListComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bets: [],
			categoryList: [],
			categoryFilter: "Toutes",
			noBet: false,
			openId: undefined,
			closeAll: this.props.closeAll,
			refreshing: false,
			error: false
		};
	}

	componentDidMount() {
		this._loadCategories();
		if (this.state.error !== undefined)
			this._loadBetList();
	}

	componentDidUpdate() {
		if (this.state.closeAll !== this.props.closeAll) {
			let bets = this.state.bets.map((item) => {
				item.open = false;
				return item;
			});
			this.setState({
				bets: bets,
				openId: undefined,
				closeAll: this.props.closeAll
			});
		}
	}

	_loadCategories() {
		CategoriesService.getAllCategories()
			.then((res) => {
				if ("error" in res) {
					this.setState({error: true});
					AlertMessage.error(res.error, this.props.navigation.navigate);
				} else {
					this.setState({categoryList: res});
				}
			});
	}

	_loadBetList() {
		BetsService.getAllBets()
			.then((res) => {
				if ("error" in res) {
					this.setState({error: true});
					AlertMessage.error(res.error, this.props.navigation.navigate);
				} else {
					res = res.filter(item => item.validate === 1 && item.deadline > Date.now() / 1000);
					res = res.map((item) => {
						item.key = item.id.toString();
						item.open = false;
						return item;
					});
					this.setState({
						bets: res,
						noBet: res.length === 0,
						refreshing: false
					});
				}
			});
	}

	_onCategoryFilter(filter) {
		let bets;

		if (filter !== "Toutes") {
			bets = this.state.bets.filter((bet) => {
				return (bet.categories.find((category) => {
						return (category.name === filter);
					}) !== undefined
				);
			});
			this.setState({
				noBet: bets.length === 0,
				categoryFilter: filter
			});
		} else {
			this.setState({
				noBet: this.state.bets.length === 0,
				categoryFilter: filter
			});
		}
	}

	_onOrderFilter(filter) {
		switch (filter) {
			case "Plus récents":
				this.setState({
					bets: this.state.bets.sort((a, b) => {
						return b.deadline - a.deadline;
					})
				});
				break;
			case "Plus anciens":
				this.setState({
					bets: this.state.bets.sort((a, b) => {
						return a.deadline - b.deadline;
					})
				});
				break;
		}
	}

	_onPress(id) {
		let bets = this.state.bets.map((bet) => {
			if (bet.id === this.state.openId)
				bet.open = false;
			else if (bet.id === id)
				bet.open = true;
			return bet;
		});
		this.setState({
			bets: bets,
			openId: (id === this.state.openId ? undefined : id)
		});
	}

	_onRefresh() {
		this.setState({refreshing: true}, () => this._loadBetList());
	}

	render() {
		if (this.state.error) {
			return (
				<View style={[commonStyle.container, commonStyle.whiteBackground]}/>
			);
		}
		return (
			<View style={[commonStyle.container, commonStyle.whiteBackground]}>
				<Filters
					categoryCallback={this._onCategoryFilter.bind(this)}
					orderCallback={this._onOrderFilter.bind(this)}
				/>
				{this._renderBets(this.state.noBet)}
			</View>
		);
	}

	_renderBets(noBet) {
		if (noBet) {
			return (
				<View style={[commonStyle.verticalCenter]}>
					<View style={commonStyle.container}>
						<Text style={commonStyle.title}>
							{"Il n'y a aucun pari ici !\nPourquoi ne pas en suggérer un ?"}
						</Text>
						{User.id === undefined
							? <Button
								onPress={() => this.props.navigation.navigate("Profile")}
								type={"normal"}
								text={"Vous devez être connecté\npour suggérer un pari"}
							/>
							: <Button
								onPress={() => this.props.navigation.navigate("BetProposal")}
								type={"normal"}
								text={"J'ai un pari à suggérer !"}
							/>
						}
					</View>
				</View>
			);
		}
		return (
			<FlatList
				data={this.state.bets}
				renderItem={({item}) =>
					<BetListItemComponent
						onPress={this._onPress.bind(this)}
						onAnswer={this.props.onAnswer}
						bet={item}
						categoryList={this.state.categoryList}
						filter={this.state.categoryFilter}/>
				}
				refreshing={this.state.refreshing}
				onRefresh={() => this._onRefresh()}
			/>
		);
	}
}

BetListComponent.propTypes = {
	onAnswer: PropTypes.func.isRequired,
	closeAll: PropTypes.number.isRequired
};

export default withNavigation(BetListComponent);
