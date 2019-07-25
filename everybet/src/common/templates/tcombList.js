import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import formStyle from '../styleSheets/formStyleSheet';

function renderRowWithoutButtons(item) {
	return <View key={item.key}>{item.input}</View>;
}

function renderRowButton(button, stylesheet, style) {
	return (
		<TouchableHighlight
			key={button.type}
			style={[formStyle.listAddButton, style]}
			onPress={button.click}
		>
			<Text style={formStyle.buttonTextList}>{button.label}</Text>
		</TouchableHighlight>
	);
}

function renderButtonGroup(buttons, stylesheet) {
	buttons[0].label = 'x';
	return (
		<View style={{ flexDirection: 'row' }}>
			{renderRowButton(buttons[0], stylesheet, formStyle.listDeleteButton)}
		</View>
	);
}

function renderRow(item, stylesheet) {
	return (
		<View key={item.key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
			<View>{item.input}</View>
			<View>
				{renderButtonGroup(item.buttons, stylesheet)}
			</View>
		</View>
	);
}

export function list(locals) {
	if (locals.hidden) {
		return null;
	}

	let stylesheet = locals.stylesheet;
	let fieldsetStyle = stylesheet.fieldset;
	let controlLabelStyle = stylesheet.controlLabel.normal;

	if (locals.hasError) {
		controlLabelStyle = stylesheet.controlLabel.error;
	}

	let label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label + '  ' }</Text>
	) : null;
	let error =
		locals.hasError && locals.error ? (
			<Text accessibilityLiveRegion='polite' style={formStyle.error}>
				{locals.error}
			</Text>
		) : null;

	let rows = locals.items.map((item) => {
		return item.buttons.length === 0
			? renderRowWithoutButtons(item)
			: renderRow(item, stylesheet);
	});
	locals.add.label = '+';

	let addButton = locals.add ? renderRowButton(locals.add, stylesheet) : null;

	return (
		<View style={fieldsetStyle}>
			<View style={formStyle.listLabelAndButtonAdd}>{label}{addButton}</View>
			{error}
			{rows}
		</View>
	);
}

