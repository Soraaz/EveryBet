import React from "react";
import renderer from "react-test-renderer";

import NotificationCenter from "../../../src/common/components/notificationCenter.js";
import {shallow} from "enzyme/build";
import {Notifications, Permissions} from 'expo';
import User from "../../../src/classes/user";
import UsersService from "../../../services/UsersService";
import AlertMessage from "../../../src/common/components/alertMessage";

describe("NotificationCenter", () => {
    describe("rendering", () => {
        it("Should render correctly", () => {
            const tree = renderer
                .create(<NotificationCenter/>)
                .toJSON();
            expect(tree).to.matchSnapshot();
        });

        describe("functionalities", () => {
            let component;
            let wrapper;
            let cb = sinon.spy();

            beforeEach(() => {
                component = new NotificationCenter();
                wrapper = shallow(<NotificationCenter callback={cb} />);
            });

            it("Should instantiate the class", () => {
                expect(component).to.be.an.instanceOf(NotificationCenter);
            });

            it("CheckToken", () => {
                component.askPermission = sinon.spy();
                expect(component.askPermission).to.be.not.called;
                component.checkToken();
                expect(component.askPermission).to.be.called;
            });

            it("Ask Permissions not granted for ios", (done) => {
                Permissions.getAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = {status: "not get"};
                    resolve(data);
                }));
                Permissions.askAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = {status: "not get"};
                    resolve(data);
                }));
                component.registerForPushNotificationsAsync = sinon.spy();
                expect(component.registerForPushNotificationsAsync).to.be.not.called;
                component.askPermission();
                setTimeout(() => {
                    expect(component.registerForPushNotificationsAsync).to.be.not.called;
                    done();
                }, 200);
            });

            it("Ask Permissions granted but acquired", (done) => {
                Permissions.getAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = {status: "not get"};
                    resolve(data);
                }));
                Permissions.askAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = {status: "granted"};
                    resolve(data);
                }));
                component.registerForPushNotificationsAsync = sinon.spy();
                expect(component.registerForPushNotificationsAsync).to.be.not.called;
                component.askPermission();
                setTimeout(() => {
                    expect(component.registerForPushNotificationsAsync).to.be.called;
                    done();
                }, 200);
            });

            it("Ask Permissions granted for ios", (done) => {
                Permissions.getAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = {status: "granted"};
                    resolve(data);
                }));
                component.registerForPushNotificationsAsync = sinon.spy();
                expect(component.registerForPushNotificationsAsync).to.be.not.called;
                component.askPermission();
                setTimeout(() => {
                    expect(component.registerForPushNotificationsAsync).to.be.called;
                    done();
                }, 200);
            });

            it("registerForPushNotificationsAsync already get token", (done) => {
                Notifications.addListener = jest.fn();
                Notifications.getExpoPushTokenAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = "token";
                    resolve(data);
                }));
                User.expoPushToken = "token";
                Notifications.addListener = sinon.spy();
                expect(Notifications.addListener).to.be.not.called;
                component.registerForPushNotificationsAsync();
                setTimeout(() => {
                    expect(Notifications.addListener).to.be.called;
                    done();
                }, 200);
            });

            it("registerForPushNotificationsAsync already new token", (done) => {
                Notifications.addListener = jest.fn();
                Notifications.getExpoPushTokenAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = "token";
                    resolve(data);
                }));
                User.expoPushToken = "another token";
                UsersService.updateUserById = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let res = [
                        {
                            "test": "test",
                        },
                    ];
                    resolve(res);
                }));

                User.updateUser = sinon.spy();
                Notifications.addListener = sinon.spy();
                expect(Notifications.addListener).to.be.not.called;
                expect(User.updateUser).to.be.not.called;
                component.registerForPushNotificationsAsync();
                setTimeout(() => {
                    expect(Notifications.addListener).to.be.called;
                    expect(User.updateUser).to.be.called;
                    done();
                }, 200);
            });

            it("registerForPushNotificationsAsync already new token error", (done) => {
                Notifications.addListener = jest.fn();
                Notifications.getExpoPushTokenAsync = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let data = "token";
                    resolve(data);
                }));
                User.expoPushToken = "another token";
                UsersService.updateUserById = jest.fn().mockReturnValue(new Promise(async (resolve) => {
                    let res = {'error' : 'Error: Test'};
                    resolve(res);
                }));

                AlertMessage.error = sinon.spy();
                Notifications.addListener = sinon.spy();
                expect(Notifications.addListener).to.be.not.called;
                expect(AlertMessage.error).to.be.not.called;
                component.registerForPushNotificationsAsync();
                setTimeout(() => {
                    expect(Notifications.addListener).to.be.called;
                    done();
                }, 200);
            });

            it("Handle notifications", (done) => {
                component.setState = sinon.spy();
                expect(component.setState).to.be.not.called;
                component._handleNotification("test");
                setTimeout(() => {
                    expect(component.setState).to.be.called;
                    done();
                }, 200);
            });

            it("Launch Crontab daily reward", (done) => {
                Notifications.scheduleLocalNotificationAsync = sinon.spy();
                expect(Notifications.scheduleLocalNotificationAsync).to.be.not.called;
                component._dailyRewardNotification();
                setTimeout(() => {
                    expect(Notifications.scheduleLocalNotificationAsync).to.be.called;
                    done();
                }, 200);
            });
        });
    });
});
