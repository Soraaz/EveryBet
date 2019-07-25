import {Text, TextInput, View, Switch} from 'react-native';
import React from 'react';
import formStyle from '../styleSheets/formStyleSheet';

export function textbox(locals) {

    let stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    let error =
        locals.hasError && locals.error ? (
            <Text accessibilityLiveRegion='polite' style={formStyle.error}>
                {locals.error}
            </Text>
        ) : null;
    let help = locals.help ? (
        <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;

    let myStyle = formStyle.container;
    if (locals.placeholder === undefined)
        myStyle = formStyle.list;

    return (
        <View style={formGroupStyle}>
            <View>
                <TextInput
                    accessibilityLabel={locals.label}
                    allowFontScaling={locals.allowFontScaling}
                    autoCapitalize={locals.autoCapitalize}
                    autoCorrect={locals.autoCorrect}
                    autoFocus={locals.autoFocus}
                    blurOnSubmit={locals.blurOnSubmit}
                    editable={locals.editable}
                    keyboardType={locals.keyboardType}
                    maxLength={locals.maxLength}
                    multiline={locals.multiline}
                    onBlur={locals.onBlur}
                    onEndEditing={locals.onEndEditing}
                    onFocus={locals.onFocus}
                    onLayout={locals.onLayout}
                    onSelectionChange={locals.onSelectionChange}
                    onSubmitEditing={locals.onSubmitEditing}
                    onContentSizeChange={locals.onContentSizeChange}
                    placeholderTextColor={'#DBDBDB'}
                    secureTextEntry={locals.secureTextEntry}
                    selectTextOnFocus={locals.selectTextOnFocus}
                    selectionColor={locals.selectionColor}
                    numberOfLines={locals.numberOfLines}
                    clearButtonMode={locals.clearButtonMode}
                    clearTextOnFocus={locals.clearTextOnFocus}
                    enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
                    keyboardAppearance={locals.keyboardAppearance}
                    onKeyPress={locals.onKeyPress}
                    returnKeyType={locals.returnKeyType}
                    selectionState={locals.selectionState}
                    onChangeText={value => locals.onChange(value)}
                    onChange={locals.onChangeNative}
                    placeholder={locals.placeholder}
                    value={locals.value}
                    testID={locals.testID}
                    textContentType={locals.textContentType}
                    style={myStyle} />
            </View>
            {help}
            {error}
        </View>
    );
}

export function checkbox(locals) {

    let error =
        locals.hasError && locals.error ? (
            <Text accessibilityLiveRegion='polite' style={formStyle.error}>
                {locals.error}
            </Text>
        ) : null;
    return (
        <View style={formStyle.checkboxAndError}>
            <View style={formStyle.checkboxView}>
                <Text style={formStyle.textCheckbox}>{locals.help}</Text>
                <Switch
                    accessibilityLabel={locals.label}
                    disabled={locals.disabled}
                    onTintColor={locals.onTintColor}
                    trackColor={{false: '#989898'}}
                    ios_backgroundColor={'#989898'}
                    thumbColor={'#F1F1F1'}
                    style={formStyle.checkbox}
                    onValueChange={value => locals.onChange(value)}
                    value={locals.value}
						testID={locals.testID}
                />
            </View>
            {error}
        </View>
    );
}

