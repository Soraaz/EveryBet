"use strict";

// modules
import React, {Component} from "react";
import {View} from "react-native";
import {withNavigation} from "react-navigation";
import t from "tcomb-form-native";

// components
import User from "../../classes/user";
import Button from "../../common/components/button";
import ServiceClientService from "../../../services/ServiceClientService";
import AlertMessage from "../../common/components/alertMessage";

// stylesheet
import {textbox, checkbox} from "../../common/templates/tcombTextboxCheckbox";

const Form = t.form.Form;

t.form.Form.templates.textbox = textbox;
t.form.Form.templates.checkbox = checkbox;

export const message = t.refinement(t.String, message => {
	return (message);
});

const ContactForm = t.struct({
    message: message
});

class ContactComponent extends Component {
    options = {
        auto: "none",
        fields: {
            message : {
				placeholder: "Message",
				error: "Entrez votre message ici"
			}
        }
    };
    
    constructor(props) {
        super(props);
    }

    _onPress () {
        let value = this.form.getValue();
        let id = User._id;
        if (!User._id)
            id = -1;
		if (value) {
            ServiceClientService.sendMessage(id, 0, value.message)
            .then((res) => {
                if ("error" in res)
                    AlertMessage.error(res.error, this.props.navigation.navigate);
                else {
                    AlertMessage.success(
                        "Message envoyé !",
                        "Nous avons bien reçu votre message !",
                        this.props.navigation.navigate,
                        "Profile"
                    );
                }
            });
		}
	}
    
    render() {
		return (
			<View style={{marginTop: 20, marginBottom: 20}}>
				<Form
					ref={c => this.form = c}
					type={ContactForm}
					options={this.options} />
				<Button
                    onPress={() => this._onPress()}
					type={"success"}
					text={"Envoyer mon message"}
				/>
			</View>
		);
	}
}
export default withNavigation(ContactComponent);