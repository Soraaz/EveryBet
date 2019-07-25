import {Component} from "react";
import {View} from "react-native";
import Button from "../../common/components/button";
import React from "react";
import t from "tcomb-form-native";

// stylesheet
import {withNavigation} from "react-navigation";
import User from "../../classes/user";
import UsersService from "../../../services/UsersService";
import AlertMessage from "../../common/components/alertMessage";
import {textbox} from "../../common/templates/tcombTextboxProfile";

// libraries
const sha = require("hash.js/lib/hash/sha/512");

const Form = t.form.Form;

let mailUsed = false;

export const email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return (reg.test(email) && (email.length <= 32) && !mailUsed);
});

export const password = t.refinement(t.String, password => {
    return (password.length >= 8 && password.length <= 32);
});

export const phone = t.refinement(t.String, phone => {
    const reg = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
    return (reg.test(phone) && phone.length <= 32);
});


const editUser = t.struct({
    email: email,
    password: password,
    phone: t.maybe(phone)
});

class EditProfilePageComponent extends Component {
    constructor(props) {
        super(props);
        this.options = {
            i18n: {
                optional: "",
                required: ""
            },
            auto: "none",
            fields: {
                email: {
                    error: "Cet e-mail n'est pas valide ou est déjà utilisé",
                    label: "E-mail",
                    template: textbox
                },
                password: {
                    error: "Votre mot de passe doit contenir au moins 8 caractères",
                    secureTextEntry: true,
                    password: true,
                    label: "Mot de passe",
                    template: textbox
                },
                phone: {
                    error: "Ce numéro n'est pas valide",
                    label: "Numéro de téléphone",
                    template: textbox
                }
            }
        };
    }

    _onPress() {
        const value = this.form.getValue();

        mailUsed = false;
        if (value) {
            if (value.email !== User.email)
                this._checkMailUsage(value);
            else
                this._updateUser(value);
        }
    }

    _checkMailUsage(value) {
        UsersService.getUserByEmail(value.email)
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                else if (res.length === 0)
                    this._updateUser(value);
                else
                    mailUsed = true;
            });
    }

    _updateUser(value) {
        const password = sha().update(value.password).digest("hex");

        UsersService.updateUserById(User.id, ["email", "password", "phone"], [value.email, password, value.phone])
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                else {
                    AlertMessage.success(
                        "Votre profil à correctement été modifié !",
                        "Vos nouvelles informations ont été mises à jour !",
                        this.props.navigation.navigate,
                        "Profile"
                    );
                    User.updateUser(res[0]);
                }
            });
    }

    render() {
        return (
            <View style={{marginTop: 20}}>
                <Form
                    ref={c => this.form = c}
                    type={editUser}
                    options={this.options}
                    value={{
                        email: User.email,
                        phone: User.phone
                    }}
                />
                <Button
                    onPress={() => this._onPress()}
                    type={"success"}
                    text={"Modifier"}
                />
            </View>
        );
    }
}

export default withNavigation(EditProfilePageComponent);