"use strict";

//modules
import React, {Component} from "react";
import {ActionSheetIOS, Platform, Picker, Text, TouchableOpacity, View} from "react-native";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";
import CategoriesService from "../../../services/CategoriesService";

// components
import AlertMessage from "./alertMessage";

//style
import filterStyle from "../styleSheets/filterStyleSheet";

class CategoryFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "Toutes",
            categoryList: []
        };
        this._changeCategory = this._changeCategory.bind(this);
    }

    componentDidMount() {
        this._getCategories();
    }

    _getCategories() {
        CategoriesService.getAllCategories()
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                else if (Array.isArray(res) === true)
                    this.setState({categoryList: res});
            });
    }

    render() {
        return (
            <View style={filterStyle.container}>
                <Text style={filterStyle.pickerTitle}>
                    {"Catégorie"}
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
                selectedValue={this.state.category}
                onValueChange={this._changeCategory}
            >
                <Picker.Item key={0} label={"Toutes"} value={"Toutes"}/>
                {this.state.categoryList.map((category) => {
                    return (
                        <Picker.Item key={category.id} label={category.name} value={category.name}/>
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
                    {this.state.category}
                </Text>
            </TouchableOpacity>
        );
    }

    _showActionSheet() {
        let list = this.state.categoryList.map((elem) => {
            return elem.name;
        });

        list.unshift("Toutes");
        ActionSheetIOS.showActionSheetWithOptions({
                options: list,
            },
            (buttonIndex) => {
                if (list[buttonIndex] === "Toutes") {
                    this._changeCategory("Toutes");
                } else {
                    this._changeCategory(list[buttonIndex]);
                }
                this.setState({category: list[buttonIndex]});
            });
    }

    _changeCategory(itemValue) {
        this.props.filterCallback(itemValue);
        this.setState({category: itemValue});
    }
}

CategoryFilter.propTypes = {
    filterCallback: PropTypes.func.isRequired
};

export default withNavigation(CategoryFilter);
