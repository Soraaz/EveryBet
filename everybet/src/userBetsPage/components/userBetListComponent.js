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
import Button from "../../common/components/button";
import AlertMessage from "../../common/components/alertMessage";
import Filters from "../../common/components/filters";
import UserBetListItemComponent from "./userBetListItemComponent";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";

class UserBetListComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bets: [],
			categoryList: [],
			filter: "Toutes",
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
			this._loadUserBets();
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

	_loadUserBets() {
		BetsService.getBetsByUserId(User.id)
			.then((res) => {
				if ("error" in res) {
					this.setState({error: true});
					AlertMessage.error(res.error, this.props.navigation.navigate);
				} else {
					res = (this.props.type === "progress"
						? res.filter(item => item.finished === 0)
						: res.filter(item => item.finished === 1));
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
			bets = this.state.bets.filter(bet => bet.categories.find(category => category.name === filter) !== undefined);
			this.setState({
				noBet: bets.length === 0,
				filter: filter
			});
		} else {
			this.setState({
				noBet: this.state.bets.length === 0,
				filter: filter
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
		this.setState({refreshing: true}, () => this._loadUserBets());
	}

	render() {
		if (this.state.error) {
			return (
				<View style={[commonStyle.container, commonStyle.whiteBackground]}/>
			);
		}
		else {
			return (
				<View style={[commonStyle.container, commonStyle.whiteBackground]}>
					<Filters
						categoryCallback={this._onCategoryFilter.bind(this)}
						orderCallback={this._onOrderFilter.bind(this)}
					/>
					{this._renderItem(this.state.noBet, this.props.type)}
				</View>
			);
		}
	}

	_renderItem(noBet, type) {
		if (noBet) {
			return (
				<View style={[commonStyle.verticalCenter]}>
					<View style={commonStyle.container}>
						<Text style={commonStyle.title}>
							{"Il n'y a aucun pari ici !\n"}
							{type === "progress"
								? "Pourquoi ne pas parier un peu ?"
								: "Vous devez parier plus si vous voulez voir des résultats ! Ou attendre ceux en cours."
							}
						</Text>
						<Button
							onPress={() => this.props.navigation.navigate("Home")}
							type={"normal"}
							text={"Amenez-moi aux paris !"}
						/>
					</View>
				</View>
			);
		} else {
			return (
				<FlatList
					data={this.state.bets}
					renderItem={({item}) =>
						<UserBetListItemComponent
							onPress={this._onPress.bind(this)}
							bet={item}
							categoryList={this.state.categoryList}
							filter={this.state.filter}
							type={type}/>
					}
					refreshing={this.state.refreshing}
					onRefresh={() => {this._onRefresh();}}
				/>
			);
		}
	}
}

UserBetListComponent.propTypes = {
	closeAll: PropTypes.number.isRequired,
	type: PropTypes.string.isRequired
};

export default withNavigation(UserBetListComponent);
