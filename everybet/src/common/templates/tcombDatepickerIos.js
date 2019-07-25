import React from 'react';
import PropTypes from 'prop-types';
import formStyle from "../styleSheets/formStyleSheet.js";

import {
	Text,
	View,
	Animated,
	DatePickerIOS,
	TouchableOpacity
} from 'react-native';

const UIPICKER_HEIGHT = 216;

class CollapsibleDatePickerIOS extends React.Component {
	constructor(props) {
		super(props);
		this._onDateChange = this.onDateChange.bind(this);
		this._onPress = this.onPress.bind(this);
		this.state = {
			isCollapsed: true,
			height: new Animated.Value(0)
		};
	}

	onDateChange(value) {
		this.props.locals.onChange(value);
	}

	onPress() {
		const locals = this.props.locals;
		let animation = Animated.timing;
		let animationConfig = {
			duration: 200
		};
		if (locals.config) {
			if (locals.config.animation) {
				animation = locals.config.animation;
			}
			if (locals.config.animationConfig) {
				animationConfig = locals.config.animationConfig;
			}
		}
		animation(
			this.state.height,
			Object.assign(
				{
					toValue: this.state.isCollapsed ? UIPICKER_HEIGHT : 0
				},
				animationConfig
			)
		).start();
		this.setState({ isCollapsed: !this.state.isCollapsed });
		if (typeof locals.onPress === 'function') {
			locals.onPress();
		}
	}

	render() {
		const locals = this.props.locals;
		const stylesheet = locals.stylesheet;
		let touchableStyle = stylesheet.dateTouchable.normal;
		if (locals.hasError) {
			touchableStyle = stylesheet.dateTouchable.error;
		}

		if (locals.disabled) {
			touchableStyle = stylesheet.dateTouchable.notEditable;
		}

		let formattedValue = locals.value ? String(locals.value) : '';
		if (locals.config) {
			if (locals.config.format && formattedValue) {
				formattedValue = locals.config.format(locals.value);
			} else if (!formattedValue) {
				formattedValue = locals.config.defaultValueText
					? locals.config.defaultValueText
					: 'Tap here to select a date';
			}
		}
		const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
		return (
			<View>
				<TouchableOpacity
					style={touchableStyle}
					disabled={locals.disabled}
					onPress={this._onPress}
				>
					<Text style={{textAlign: 'center'}}>{formattedValue}</Text>
				</TouchableOpacity>
				<Animated.View
					style={{ height: this.state.height, overflow: 'hidden' }}
				>
					<DatePickerIOS
						accessibilityLabel={locals.label}
						date={locals.value || new Date()}
						initialDate={new Date()}
						maximumDate={locals.maximumDate}
						minimumDate={locals.minimumDate}
						minuteInterval={locals.minuteInterval}
						mode={locals.mode}
						onDateChange={this._onDateChange}
						timeZoneOffsetInMinutes={locals.timeZoneOffsetInMinutes}
						style={[formStyle.deadlinePicker, { height: height }]}
					/>
				</Animated.View>
			</View>
		);
	}
}

CollapsibleDatePickerIOS.propTypes = {
	locals: PropTypes.object.isRequired
};

export function datepickerIos(locals) {
	if (locals.hidden) {
		return null;
	}

	const stylesheet = locals.stylesheet;
	let controlLabelStyle = stylesheet.controlLabel.normal;
	let helpBlockStyle = stylesheet.helpBlock.normal;
	const errorBlockStyle = stylesheet.errorBlock;

	if (locals.hasError) {
		controlLabelStyle = stylesheet.controlLabel.error;
		helpBlockStyle = stylesheet.helpBlock.error;
	}

	const label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label}</Text>
	) : null;
	const help = locals.help ? (
		<Text style={helpBlockStyle}>{locals.help}</Text>
	) : null;
	const error =
		locals.hasError && locals.error ? (
			<Text accessibilityLiveRegion='polite' style={errorBlockStyle}>
				{locals.error}
			</Text>
		) : null;

	return (
		<View style={formStyle.deadlineIos}>
			{label}
			<CollapsibleDatePickerIOS locals={locals}/>
			{help}
			{error}
		</View>
	);
}