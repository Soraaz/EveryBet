"use strict";

// modules
import React, {Component} from "react";
import {AsyncStorage, View} from "react-native";
import {withNavigation} from "react-navigation";
import t from "tcomb-form-native";
import UsersService from "../../../services/UsersService";

// components
import User from "../../classes/user";
import Button from "../../common/components/button";
import AlertMessage from "../../common/components/alertMessage";
import {textbox, checkbox} from "../../common/templates/tcombTextboxCheckbox";

// libraries
const sha = require("hash.js/lib/hash/sha/512");

const Form = t.form.Form;

Form.templates.textbox = textbox;
Form.templates.checkbox = checkbox;

export const login = t.refinement(t.String, login => {
    return (login.length <= 32 && LoginFormComponent.nonexistentLogin);
});

login.getValidationErrorMessage = function () {
    if (!LoginFormComponent.nonexistentLogin)
        return "This user does not exist";
    return "Veuillez entrer votre identifiant";
};

export const password = t.refinement(t.String, password => {
    return (password.length >= 8 && password.length <= 32 && LoginFormComponent.wrongPassword);
});

password.getValidationErrorMessage = function () {
    if (!LoginFormComponent.wrongPassword)
        return "The password is incorrect";
    return "Veuillez entrer votre mot de passe";
};

const loginUser = t.struct({
    login: login,
    password: password,
    rememberMe: t.Boolean
});

class LoginFormComponent extends Component {
    static nonexistentLogin = true;
    static wrongPassword = true;
    options = {
        auto: "none",
        fields: {
            login: {
                placeholder: "Identifiant"
            },
            password: {
                placeholder: "Mot de passe",
                secureTextEntry: true,
                password: true,
            },
            rememberMe: {
                help: "Se souvenir de moi",
            }
        }
    };

    constructor(props) {
        super(props);
    }

    async _rememberMe(login, rememberMe) {
        if (rememberMe)
            await AsyncStorage.multiSet([["login", login], ["rememberMe", "true"]]);
        else
            await AsyncStorage.multiSet([["login", login], ["rememberMe", "false"]]);
    }

    _userDoesNotExist() {
        LoginFormComponent.nonexistentLogin = false;
        this.form.getValue();
        LoginFormComponent.nonexistentLogin = true;
    }

    _wrongPassword() {
        LoginFormComponent.wrongPassword = false;
        this.form.getValue();
        LoginFormComponent.wrongPassword = true;
    }

    _login(result) {
        User.setUser(result);
        this._rememberMe(result.login, this.form.getValue().rememberMe);
        AlertMessage.success(
            "Connecté",
            "Vous avez été connecté avec succès !\nAmusez-vous bien en pariant !",
            this.props.navigation.navigate,
            "Home"
        );
    }

    _userExists(result, value) {
        let hash = sha().update(value.password).digest("hex");
        if (result.password !== hash)
            this._wrongPassword();
        else
            this._login(result);
    }

    _onPress () {
        let value = this.form.getValue();
        if (value) {
            UsersService.getUsersByLogin(value.login)
                .then((res) => {
                    if ("error" in res)
                        AlertMessage.error(res.error, this.props.navigation.navigate);
                    else {
                        let userExists = false;
                        res.map((result) => {
                            userExists = true;
                            this._userExists(result, value);
                        });
                        if (!userExists)
                            this._userDoesNotExist(value.login);
                    }
                });
        }
    }

    render() {
        return (
            <View style={{marginTop: 20}}>
                <Form
                    ref={c => this.form = c}
                    type={loginUser}
                    options={this.options}
                />
                <Button
                    onPress={() => this._onPress()}
                    type={"success"}
                    text={"Se connecter"}
                />
            </View>
        );
    }
}

export default withNavigation(LoginFormComponent);
