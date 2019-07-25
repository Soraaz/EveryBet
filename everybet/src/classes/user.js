"use strict";

// modules
import APIToolsService from "../../services/APIToolsService";

export default class User {
    static get className() {
        return "User";
    }

    static setUser(userInfos) {
        this.id = userInfos.id;
        this.login = userInfos.login;
        this.firstName = userInfos.firstName;
        this.email = userInfos.email;
        this.coins = userInfos.coins;
        this.address = userInfos.address === null ? "" : userInfos.address;
        this.additionalInformation = userInfos.additionalInformation === null ? "" : userInfos.additionalInformation;
        this.zipCode = userInfos.zipCode === null ? "" : userInfos.zipCode;
        this.country = userInfos.country === null ? "" : userInfos.country;
        this.phone = userInfos.phone === null ? "" : userInfos.phone;
        this.avatar = userInfos.avatar === null ? null : APIToolsService.getUrl() + userInfos.avatar;
        this.reward = userInfos.reward === 0;
        this.rewardTier = userInfos.rewardTier;
        this.rewardValue = userInfos.rewardValue;
        this.expoPushToken = userInfos.expoPushToken;
        this.notificationCenter.checkToken();
        this.dailyBets = 0;
    }

    static updateUser(userInfos) {
        this.email = userInfos.email;
        this.address = userInfos.address === null ? "" : userInfos.address;
        this.additionalInformation = userInfos.additionalInformation === null ? "" : userInfos.additionalInformation;
        this.zipCode = userInfos.zipCode === null ? "" : userInfos.zipCode;
        this.country = userInfos.country === null ? "" : userInfos.country;
        this.phone = userInfos.phone === null ? "" : userInfos.phone;
    }

    static disconnect() {
        this.login = undefined;
        this.firstName = undefined;
        this.email = undefined;
        this.id = undefined;
        this.coins = undefined;
        this.address = undefined;
        this.additionalInformation = undefined;
        this.zipCode = undefined;
        this.country = undefined;
        this.phone = undefined;
        this.avatar = undefined;
        this.reward = false;
        this.rewardTier = undefined;
        this.rewardValue = undefined;
    }

    static set id(id) {
        this._id = id;
    }

    static get id() {
        return (this._id);
    }

    static set login(login) {
        this._login = login;
    }

    static get login() {
        return (this._login);
    }

    static set firstName(firstName) {
        this._firstName = firstName;
    }

    static get firstName() {
        return (this._firstName);
    }

    static set email(email) {
        this._email = email;
    }

    static get email(){
        return (this._email);
    }

    static set coins(coins) {
        this._coins = coins;
    }

    static get coins(){
        return (this._coins);
    }

    static set address(address) {
        this._address = address;
    }

    static get address(){
        return (this._address);
    }

    static set additionalInformation(additionalInformation) {
        this._additionalInformation = additionalInformation;
    }

    static get additionalInformation(){
        return (this._additionalInformation);
    }

    static set zipCode(zipCode) {
        this._zipCode = zipCode;
    }

    static get zipCode(){
        return (this._zipCode);
    }

    static set country(country) {
        this._country = country;
    }

    static get country(){
        return (this._country);
    }

    static set phone(phone) {
        this._phone = phone;
    }

    static get phone(){
        return (this._phone);
    }

    static set avatar(avatar) {
        this._avatar = avatar;
    }

    static get avatar(){
        return (this._avatar);
    }

    static set reward(reward) {
        this._reward = reward;
    }

    static get reward(){
        return (this._reward);
    }

    static set rewardTier(rewardTier) {
        this._rewardTier = rewardTier;
    }

    static get rewardTier(){
        return (this._rewardTier);
    }

    static set rewardValue(rewardValue) {
        this._rewardValue = rewardValue;
    }

    static get rewardValue(){
        return (this._rewardValue);
    }

    static set expoPushToken(expoPushToken) {
        this._expoPushToken = expoPushToken;
    }

    static get expoPushToken(){
        return (this._expoPushToken);
    }

    static set notificationCenter(notificationCenter) {
        this._notificationCenter = notificationCenter;
    }

    static get notificationCenter(){
        return (this._notificationCenter);
    }

    static set dailyBets(dailyBets) {
        this._dailyBets = dailyBets;
    }

    static get dailyBets(){
        return (this._dailyBets);
    }
}
