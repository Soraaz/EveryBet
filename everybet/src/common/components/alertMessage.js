import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import PropTypes from 'prop-types';

class AlertMessage extends Component {

    constructor(props) {
        super(props);
    }

    static selectAlert(type, props)
    {
        switch(type) {
            case 'simple':
                this.simple(props.title, props.message);
                break;
            case 'success':
                this.success(props.title, props.message, props.callback, props.params);
                break;
            case 'successTwoButtons':
                this.successTwoButton(props.title, props.message, props.buttonMessage, props.buttonMessage2, props.callback, props.param, props.param2);
                break;
            case 'error':
                this.error(props.message, props.callback);
                break;
            case 'simpleError':
                this.simpleError(props.message);
                break;
            default:
                return null;
        }
    }

    static simple(title, message)
    {
        Alert.alert(
            title,
            message,
            [{
                text: 'OK',
            }],
            {cancelable: false}
        );
    }

    static success(title, message, callback, param) {
        Alert.alert(
            title,
            message,
            [{
                text: 'OK',
                onPress: () => callback.apply(this, [param])
            }],
            {cancelable: false}
        );
    }

    static yesOrNo(title, message, callback, param, buttonMessage) {
        Alert.alert(
            title,
            message,
            [{
                text: buttonMessage,
                onPress: () => callback.apply(this, [param])
            },
            {
                text: "Non",
            }],
            {cancelable: false}
        );
    }

    static successTwoButton(title, message, buttonMessage, buttonMessage2, callback, callback2, param, param2) {
        Alert.alert(
            title,
            message,
            [
                {
                    text: buttonMessage,
                    onPress: () => callback.apply(this, [param])
                },
                {
                    text: buttonMessage2,
                    onPress: () => callback2.apply(this, [param2])
                }],
            {cancelable: false}
        );
    }

    static error(message, callback)
    {
        Alert.alert(
            'An error has occurred !',
            message,
            [{
                text: 'Refresh',
                onPress: () => callback.apply(this, ['Home'])
            }],
            {cancelable: false}
        );
    }

    static simpleError(message)
    {
        Alert.alert(
            'An error has occurred !',
            message,
            [{
                text: 'Ok',
            }],
            {cancelable: false}
        );
    }

    render() {
        return (
            <View>
                {AlertMessage.selectAlert(this.props.type, this.props)}
            </View>
        );
    }
}

AlertMessage.propTypes = {
    type: PropTypes.string,
    callback: PropTypes.func,
    title: PropTypes.string,
    buttonMessage: PropTypes.string,
    buttonMessage2: PropTypes.string,
    message: PropTypes.string,
    params: PropTypes.array,
    params2: PropTypes.array,
};

export default AlertMessage;