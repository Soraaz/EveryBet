"use strict";

// modules
import React, {Component} from "react";
import {Platform, View} from "react-native";
import {withNavigation} from "react-navigation";
import t from "tcomb-form-native";
import BetsService from "../../../services/BetsService";

// components
import Button from "../../common/components/button";
import AlertMessage from "../../common/components/alertMessage";

// styles
import {textbox} from "../../common/templates/tcombTextboxCheckbox";
import {list} from "../../common/templates/tcombList";
//import {selectAndroid} from "../../common/templates/tcombSelectAndroid";
import {selectIos} from "../../common/templates/tcombSelectIos";
import {datepickerAndroid} from "../../common/templates/tcombDatepickerAndroid";
import {datepickerIos} from "../../common/templates/tcombDatepickerIos";

const Form = t.form.Form;

Form.templates.textbox = textbox;
Form.templates.list = list;
Form.templates.select = (Platform.OS === "android" ? selectIos : selectIos);
Form.templates.datepicker = (Platform.OS === "android" ? datepickerAndroid : datepickerIos);

export const Name = t.refinement(t.String, name => {
    BetProposalComponent.nameTooLong = name.length >= 255;
    return (name.length <= 255 && name.length > 0);
});

Name.getValidationErrorMessage = function () {
    if (BetProposalComponent.nameTooLong)
        return "Votre titre est trop long !";
    return "Votre pari a besoin d'un titre";
};

export const Description = t.refinement(t.String, desc => {
    return (desc.length <= 255 && desc.length > 0);
});

export const Deadline = t.refinement(t.Date, deadline => {
    return (Date.parse(deadline) > Date.now());
});

const CategoryEnum = t.enums({
	1: "Art",
	2: "Espace",
	3: "Finance",
	4: "Fun",
	5: "Jeux Vidéos",
	6: "Litérature",
	7: "News",
	8: "Numérique",
	9: "People",
	10: "Politique",
	11: "Sciences",
	12: "Sport"
});

export const Category = t.refinement(t.list(CategoryEnum), categories => {
    return (categories.length >= 1 && categories.length <= 10);
});

export const Answer = t.refinement(t.String, answer => {
    return (answer.length > 0 && answer.length <= 32);
});

export const Answers = t.refinement(t.list(Answer), answer => {
    return (answer.length >= 2 && answer.length <= 20);
});

const BetProposal = t.struct({
    name: Name,
    description: Description,
    deadline: Deadline,
    categories: Category,
//    category: CategoryEnum,
    answers: Answers,
});

class BetProposalComponent extends Component {
	lock = false;
	static nameTooLong = false;
	options = {
		auto: "none",
		fields: {
			name : {
				placeholder: "Titre",
				error: "Votre pari a besoin d'un titre",
			},
			description : {
				placeholder: "Description",
				error: "Votre pari a besoin d'une description",
			},
			deadline: {
				label: "Date limite",
				error: "Votre pari a besoin d'une date limite",
				mode: "datetime",
				minimumDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
				config: {
					format: (date) => {
						const newDate = new Date(date);
						return(
							(newDate.getDate() < 10 ? "0" : "") + newDate.getDate() +  "/" +
							(newDate.getMonth() + 1 < 10 ? "0" : "") + (newDate.getMonth() + 1) + "/" +
							newDate.getFullYear() + " à " +
							(newDate.getHours() < 10 ? "0" : "") + newDate.getHours() +  ":" +
							(newDate.getMinutes() < 10 ? "0" : "") + newDate.getMinutes()
						);
					},
					defaultValueText: "Touchez pour choisir"
				},
			},
			categories: {
				label: "Catégorie(s)",
				error: "Votre pari nécessite au moins une catégorie",
				item: {
					error: "Veuillez sélectionner une catégorie",
				}
			},
			category:{
				hidden: true
			},
			answers: {
				label: "Réponses",
				error: "Votre pari nécessite au moins deux réponses",
				item: {
					error: "Veuillez entrer une réponse"
				}
			},
		},
	};

	constructor(props) {
		super(props);
	}

	_sendBet(value) {
		const categories = Array.from(new Set(value.categories));
		BetsService.createNewBet(value.name, value.description, Date.parse(value.deadline) / 1000, value.answers, categories)
			.then((res) => {
				if ("error" in res)
					AlertMessage.error(res.error, this.props.navigation.navigate);
				else {
					AlertMessage.successTwoButton(
						"Pari envoyé",
						"Votre pari a été envoyé à notre équipe de modération pour approbation.",
						"En suggérer un autre",
						"Retourner au profil",
						this.props.navigation.navigate,
						"BetProposal",
						"Profile"
					);
				}
				this.lock = false;
			});
	}

	_onPress () {
		let value = this.form.getValue();
		if (value && !this.lock) {
			this.lock = true;
			this._sendBet(value);
		}
	}

	render() {
		return (
			<View style={{marginBottom: 20}}>
				<Form
					ref={c => this.form = c}
					type={BetProposal}
					options={this.options} />
				<Button
					onPress={() => this._onPress()}
					type={"send"}
					text={"Envoyer votre pari !"}
				/>
			</View>
		);
	}
}

export default withNavigation(BetProposalComponent);
