"use strict";

// modules
import React from "react";
import {Notifications, Permissions} from "expo";
import {Platform} from "react-native";
import UsersService from "../../../services/UsersService";

// components
import User from "../../classes/user";
import AlertMessage from "./alertMessage";

class NotificationCenter extends React.Component {
    state = {
        notification: {},
    };
    localNotification = {
        title: "Salut " + User.login,
        body: "Tu peux récuperer ton bonus journalier !"
    };
    schedulingOptions = {
        time: (new Date()).getTime() + 10000
    };

    constructor(props) {
        super(props);
        User.notificationCenter = this;
    }

    async askPermission() {
        const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (permission.status !== "granted") {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (status !== "granted") {
                if (Platform.OS === "ios")
                    this.showAlert();
                return null;
            }
            else
                this.registerForPushNotificationsAsync();
        }
        else
            this.registerForPushNotificationsAsync();
    }

    async registerForPushNotificationsAsync() {
        let token = await Notifications.getExpoPushTokenAsync();

        if (User.expoPushToken !== token) {
            let filters = new Map();
            filters.set("expoPushToken", token);
            UsersService.updateUserById(User.id, filters)
                .then((res) => {
                    if ("error" in res) {
                        AlertMessage.error(res.error, this.props.navigation.navigate);
                    }
                    else {
                        User.updateUser(res[0]);
                    }
                });
        }
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _dailyRewardNotification(){
        if (User.expoPushToken !== undefined) {
            let today = new Date();
            let tomorrow = today.setDate(today.getDate() + 1);
            this.localNotification.title = "Salut " + User.login;
            this.schedulingOptions.time = tomorrow;
            Notifications.scheduleLocalNotificationAsync(this.localNotification, this.schedulingOptions);
        }
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    /*    _sendPushNotification(token = User.expoPushToken, title = this.localNotification.title, body = this.localNotification.body) {
			return fetch("https://exp.host/--/api/v2/push/send", {
				body: JSON.stringify({
					to: token,
					title: title,
					body: body,
					data: {message: `${title} - ${body}`},
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});
		}
	*/
    render() {
        return null;
    }

    checkToken() {
        this.askPermission();
        //     this.sendPushNotification(User.expoPushToken);
    }
}

export default NotificationCenter;