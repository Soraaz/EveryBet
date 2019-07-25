"use strict";

// modules
import React, {Component} from "react";
import {withNavigation} from "react-navigation";
import UsersService from "../../../services/UsersService";

// components
import User from "../../classes/user";
import AlertMessage from "../../common/components/alertMessage";
import Button from "../../common/components/button";

class DeleteMyAccountComponent extends Component {
    constructor(props) {
        super(props);
    }

    _onPress()
    {
        AlertMessage.yesOrNo(
            "Supprimer mon compte ?",
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
            DeleteMyAccountComponent.deleteAccount,
            this.props.navigation,
            "Oui");
    }

    static deleteAccount(navigation)
    {
        UsersService.deleteUserById(User.id)
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, DeleteMyAccountComponent.props.navigation.navigate);
            });
        User.disconnect();
        AlertMessage.success(
            "Votre compte a bien été supprimé.",
            "Vous allez vous allez être déconnecté.",
            navigation.navigate,
            "Profile");
    }

    render() {
        return (
            <Button
                onPress={() => this._onPress()}
                type={"warning"}
                text={"Supprimer mon compte"}
            />
        );
    }
}
export default withNavigation(DeleteMyAccountComponent);