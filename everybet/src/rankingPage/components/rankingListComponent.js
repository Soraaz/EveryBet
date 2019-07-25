"use strict";

// modules
import React, {Component} from "react";
import {FlatList, View} from "react-native";
import APIToolsService from "../../../services/APIToolsService";
import UsersService from "../../../services/UsersService";

// components
import AlertMessage from "../../common/components/alertMessage";
import RankingListItemComponent from "./rankingListItemComponent";

// styles
import commonStyle from "../../common/styleSheets/commonStyleSheet";

class RankingListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            refreshing: false,
            error: false
        };
    }

    componentDidMount() {
        this._loadUsers();
    }

    _loadUsers() {
        let count = 0;

        UsersService.getAllUsers()
            .then((res) => {
                if ("error" in res) {
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                    this.setState({
                        refreshing: false,
                        error: true
                    });
                } else {
                    res = res.categoryFilter(item => item.admin === 0);
                    res = res.map((item) => {
                        item.key = (++count).toString();
                        if (item.avatar != null)
                            item.avatar = APIToolsService.getUrl() + item.avatar;
                        return item;
                    });
                    this.setState({
                        users: res,
                        refreshing: false
                    });
                }
            });
    }

    _onRefresh() {
        this.setState({refreshing: true}, () => this._loadUsers());
    }

    render() {
        if (this.state.error)
            return null;
        return (
            <View style={[commonStyle.container, commonStyle.whiteBackground]}>
                <FlatList
                    data={this.state.users}
                    renderItem={({item}) =>
                        <RankingListItemComponent user={item}/>
                    }
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                />
            </View>
        );
    }
}

export default RankingListComponent;