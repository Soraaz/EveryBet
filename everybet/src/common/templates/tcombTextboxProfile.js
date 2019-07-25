import formStyle from "../styleSheets/formStyleSheet";
import editIcon from "../../../assets/images/edit-solid.png";
import {Image} from "react-native";

let React = require("react");
let { View, Text, TextInput } = require("react-native");

export function textbox(locals) {
    if (locals.hidden) {
        return null;
    }

    let stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;

    if (locals.hasError) {
        formGroupStyle = stylesheet.formGroup.error;
        helpBlockStyle = stylesheet.helpBlock.error;
    }

    let delivery;
    if (locals.label === "Address")
       delivery = <Text style={formStyle.deliveryTitle}>{'Delivery informations'}</Text>;

    let label = locals.label ? (
        <View style={formStyle.labelMainStyle}><Text style={{fontWeight: "bold",fontSize: 15}}>{locals.label} : </Text><Image source={editIcon} style={{height: 15, width: 15}} /><Text>{" "}</Text></View>
    ) : null;
    let help = locals.help ? (
        <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;
    let error =
        locals.hasError && locals.error ? (
            <Text accessibilityLiveRegion='polite' style={formStyle.errorProfile}>
                {locals.error}
            </Text>
        ) : null;

    return (
        <View style={{formGroupStyle}}>
            {delivery}
            <View style={formStyle.profileMainStyle}>
            {label}
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
                    placeholderTextColor={locals.placeholderTextColor}
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
                    style={{fontSize: 15, fontWeight: "normal",  minWidth: 100}}
                    textContentType={locals.textContentType}
                />
            </View>
            {help}
            {error}
        </View>
    );
}