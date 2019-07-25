"use strict";

//modules
import React, {Component} from "react";
import {View} from "react-native";
import PropTypes from "prop-types";

//style
import filterStyle from "../styleSheets/filterStyleSheet";
import CategoryFilter from "./categoryFilter";
import OrderFilter from "./orderFilter";

class Filters extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={filterStyle.mainContainer}>
				<CategoryFilter filterCallback={this.props.categoryCallback}/>
				<OrderFilter filterCallback={this.props.orderCallback}/>
			</View>
		);
	}
}

Filters.propTypes = {
	categoryCallback: PropTypes.func.isRequired,
	orderCallback: PropTypes.func.isRequired
};

export default Filters;
