import React from 'react';
import {Picker, Text, View} from 'react-native';
import formStyle from '../styleSheets/formStyleSheet';

export function selectAndroid(locals) {
	if (locals.hidden) {
		return null;
	}

	let stylesheet = locals.stylesheet;
	let formGroupStyle = formStyle.pickerAndroid;
	let controlLabelStyle = stylesheet.controlLabel.normal;
	let selectStyle = Object.assign(
		{},
		stylesheet.select.normal,
		stylesheet.pickerContainer.normal
	);
	let helpBlockStyle = stylesheet.helpBlock.normal;
	let errorBlockStyle = formStyle.error;

	if (locals.hasError) {
		controlLabelStyle = stylesheet.controlLabel.error;
		selectStyle = stylesheet.select.error;
		helpBlockStyle = stylesheet.helpBlock.error;
	}

	let label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label}</Text>
	) : null;
	let help = locals.help ? (
		<Text style={helpBlockStyle}>{locals.help}</Text>
	) : null;
	let error =
		locals.hasError && locals.error ? (
			<Text accessibilityLiveRegion='polite' style={errorBlockStyle}>
				{locals.error}
			</Text>
		) : null;

	let options = locals.options.map(({ value, text }) => (
		<Picker.Item key={value} value={value} label={text} />
	));

	return (
		<View style={formGroupStyle}>
			{label}
			<Picker
				accessibilityLabel={locals.label}
				style={selectStyle}
				selectedValue={locals.value}
				onValueChange={locals.onChange}
				help={locals.help}
				enabled={!locals.disabled}
				mode={locals.mode}
				prompt={locals.prompt}
				itemStyle={locals.itemStyle}
			>
				{options}
			</Picker>
			{help}
			{error}
		</View>
	);
}