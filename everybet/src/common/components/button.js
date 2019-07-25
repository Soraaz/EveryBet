"use strict";

// modules
import React, {Component} from "react";
import {Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";

// styles
import buttonStyle from "../styleSheets/buttonStyleSheet";

class Button extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pressed: false
		};
	}

	static buttonType = {
		"normal": buttonStyle.normal,
		"normalSmall": buttonStyle.normalSmall,
		"success": buttonStyle.success,
		"warning": buttonStyle.warning,
		"send": buttonStyle.send,
	};

	_onPress() {
		this.props.onPress();
		this.setState({pressed: false});
	}

	render() {
		const {type, text} = this.props;

		return(
			<TouchableOpacity
				onPress={() => this.setState({pressed: true}, () => this._onPress())}
				style={[buttonStyle.container, Button.buttonType[type]]}
				disabled={this.state.pressed}>
				<Text style={buttonStyle.text}>
					{text}
				</Text>
			</TouchableOpacity>
		);
	}
}

Button.propTypes = {
	onPress: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

export default Button;