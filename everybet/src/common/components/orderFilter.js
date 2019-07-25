"use strict";

//modules
import React, {Component} from "react";
import {ActionSheetIOS, Platform, Picker, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

//style
import filterStyle from "../styleSheets/filterStyleSheet";

class OrderFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: "Plus récents",
            orderList: [
                {id: 1, name: "Plus anciens"},
                {id: 2, name: "Populaires"},
                {id: 3, name: "Impopulaires"}
            ]
        };
        this._changeOrder = this._changeOrder.bind(this);
    }

    render() {
        return (
            <View style={filterStyle.container}>
                <Text style={filterStyle.pickerTitle}>
                    {"Ordre"}
                </Text>
                <View style={filterStyle.picker}>
                    {Platform.OS === "android"
                        ? this._renderPickerAndroid()
                        : this._renderPickerIOS()
                    }
                </View>
            </View>
        );
    }

    _renderPickerAndroid() {
        return(
            <Picker
                style={{width: "100%", height: "100%"}}
                selectedValue={this.state.order}
                onValueChange={this._changeOrder}
            >
                <Picker.Item key={0} label={"Plus récents"} value={"Plus récents"}/>
                {this.state.orderList.map((order) => {
                    return (
                        <Picker.Item key={order.id} label={order.name} value={order.name}/>
                    );
                })}
            </Picker>
        );
    }

    _renderPickerIOS() {
        return(
            <TouchableOpacity
                style={filterStyle.textIOS}
                onPress={this._showActionSheet}
            >
                <Text>
                    {this.state.order}
                </Text>
            </TouchableOpacity>
        );
    }

    _showActionSheet() {
        let list = this.state.orderList.map((elem) => {
            return elem.name;
        });

        list.unshift("Plus récents");
        ActionSheetIOS.showActionSheetWithOptions({
                options: list,
            },
            (buttonIndex) => {
                if (list[buttonIndex] === "Plus récents") {
                    this._changeOrder("Plus récents");
                } else {
                    this._changeOrder(list[buttonIndex]);
                }
                this.setState({order: list[buttonIndex]});
            });
    }

    _changeOrder(itemValue) {
        this.props.filterCallback(itemValue);
        this.setState({order: itemValue});
    }
}

OrderFilter.propTypes = {
    filterCallback: PropTypes.func.isRequired
};

export default OrderFilter;
