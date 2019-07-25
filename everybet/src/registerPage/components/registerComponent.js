"use strict";

// modules
import React, {Component} from "react";
import {View, Text} from "react-native";
import {withNavigation} from "react-navigation";
import t from "tcomb-form-native";
import UsersService from "../../../services/UsersService";
import MailerService from "../../../services/MailerService";

// components
import User from "../../classes/user";
import Button from "../../common/components/button";
import AlertMessage from "../../common/components/alertMessage";

// libraries
const sha = require("hash.js/lib/hash/sha/512");

// stylesheet
import {textbox, checkbox} from "../../common/templates/tcombTextboxCheckbox";

const Form = t.form.Form;

t.form.Form.templates.textbox = textbox;
t.form.Form.templates.checkbox = checkbox;

let loginExists = true;
let mailExists = true;

export const login = t.refinement(t.String, login => {
	const reg = /[^a-zA-Z0-9]/;
	return (!reg.test(login) && loginExists && login.length <= 32);
});

export const email = t.refinement(t.String, email => {
	const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return (reg.test(email) && (email.length <= 32) && mailExists);
});

export const password = t.refinement(t.String, password => {
	RegisterComponent.tmpPassword = password;
	return (password.length >= 8 && password.length <= 32);
});

export const passwordConfirm = t.refinement(t.String, passwordConfirm => {
	return (passwordConfirm === RegisterComponent.tmpPassword);
});

export const terms = t.refinement(t.Boolean, terms => {
	return (terms);
});

const UserForm = t.struct({
	login: login,
	email: email,
	password: password,
	passwordConfirm: passwordConfirm,
	terms: terms
});

class RegisterComponent extends Component {
	options = {
		auto: "none",
		fields: {
			login : {
				placeholder: "Identifiant",
				error: "Cet identifiant est invalide ou est déjà utilisé\n(seuls les caractères alphanumériques sont acceptés)",
			},
			email: {
				placeholder: "E-mail",
				error: "Cet e-mail est invalide ou est déjà utilisé"
			},
			password: {
				placeholder: "Mot de passe",
				error: "Votre mot de passe doit contenir au moins 8 caractères",
				secureTextEntry: true,
				password: true,
			},
			passwordConfirm: {
				placeholder: "Confirmation du mot de passe",
				error: "Vos mots de passe ne correspondent pas",
				secureTextEntry: true,
				password: true,
			},
			terms: {
				error: "Vous devez accepter les conditions d'utilisation",
				help: "J'accepte les conditions d'utilisation"
			},
		},
	};

	constructor(props) {
		super(props);
	}

	_checkLogin(login) {
		UsersService.getUsersByLogin(login)
			.then((res) => {
				if ("error" in res)
					AlertMessage.error(res.error, this.props.navigation.navigate);
				else {
					let loginExists = false;
					res.map(() => {
						loginExists = true;
						this._loginExists();
					});
					if (!loginExists)
						this._loginDoesNotExist();
				}
			});
	}

	_loginExists() {
		loginExists = false;
		this.form.getValue();
		loginExists = true;
	}

	_loginDoesNotExist() {
		loginExists = true;
		let value = this.form.getValue();
		this._checkMail(value.email);
	}

	_checkMail(mail) {
		UsersService.getUserByEmail(mail)
			.then((res) => {
				if ("error" in res)
					AlertMessage.error(res.error, this.props.navigation.navigate);
				else {
					let mailExists = false;
					res.map(() => {
						mailExists = true;
						this._mailExists();
					});
					if (!mailExists)
						this._mailDoesNotExist();
				}
			});
	}

	_mailExists() {
		mailExists = false;
		this.form.getValue();
		mailExists = true;
	}

	_mailDoesNotExist() {
		mailExists = true;
		let value = this.form.getValue();
		let filters = new Map();
		filters.set("email", value.email);
		filters.set("name", value.login);
		if (value) {
			let password = sha().update(value.password).digest("hex");
			UsersService.createNewUser(value.login, "", value.email, password, 100)
				.then((res) => {
					if ("error" in res)
						AlertMessage.error(res.error, this.props.navigation.navigate);
					else {
						MailerService.sendRegistrationMail(filters);
						User.setUser(res[0]);
						AlertMessage.success(
							"Inscription réussie !",
							"Votre compte a été créé avec succès !",
							this.props.navigation.navigate,
							"Profile"
						);
					}
				});
		}
	}

	_onPress () {
		let value = this.form.getValue();
		if (value) {
			this._checkLogin(value.login);
		}
	}

	render() {
		return (
			<View style={{marginTop: 20, marginBottom: 20}}>
				<Form
					ref={c => this.form = c}
					type={UserForm}
					options={this.options} />
				<Text onPress={() => this.props.navigation.navigate("Terms")}>Link to Terms</Text>
				<Button
					onPress={() => this._onPress()}
					type={"success"}
					text={"S'inscrire"}
				/>
			</View>
		);
	}
}

export default withNavigation(RegisterComponent);
