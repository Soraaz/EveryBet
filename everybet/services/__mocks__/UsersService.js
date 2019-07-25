"use strict";

class UsersService {
    static addUserResponse = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        resolve();
    }));

    static removeCoinsByUserId = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        resolve();
    }));

    static addCoinsByUserId = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        resolve();
    }));

    static getUserById = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        let res = [{
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": "images/uploads/b77036a7cb9344dfc7b901e07097e036.png",
            "coins": 999999999,
            "country": null,
            "email": "a.a@a.fr",
            "expoPushToken": "",
            "id": 15,
            "login": "Altan",
            "name": "",
            "password": "43102984a36d9196dd2d92cf10de63cd44226bcc6f8e5135a9780a9c8303a44fb687ba6134b4d4b68259aac57d7ff0f2ab6ca877019b75752dda8cf03a1c18ac",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }];
        resolve(res);
    }));

    static getUserByEmail = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        let res = [{
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": null,
            "coins": 110,
            "country": null,
            "email": "antoine.dury@epitech.eu",
            "expoPushToken": "",
            "id": 3,
            "login": "Anto",
            "name": "Antoine",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }];
        resolve(res);
    }));

    static getAllUsers = jest.fn().mockReturnValue(new Promise(async (resolve) => {
        let res = [{
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": "images/uploads/ed8d8b46fbe0747ccf5735e0b88bfb2d.png",
            "coins": 11111,
            "country": null,
            "email": "Sora333@hotmail.fr",
            "expoPushToken": "",
            "id": 20,
            "login": "Sora2",
            "name": "",
            "password": "267f9f0b7fb7ad7209367f9b37db600c51b4729ca2eb842a7c125e107fd2531c36e19cbdc0cfee35d15ef927a1a222fab97742546cd973c69b145781036a080d",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": null,
            "coins": 10000,
            "country": null,
            "email": "Jaja@gmail.com",
            "expoPushToken": "",
            "id": 18,
            "login": "Jaja",
            "name": "Ja",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": "images/uploads/456a8be835912a7f1e195607be360274.png",
            "coins": 509,
            "country": null,
            "email": "Sora322@hotmao.fr",
            "expoPushToken": "ExponentPushToken[5tFwMaOMWh4K4CTfpJzgRR]",
            "id": 17,
            "login": "Sora3",
            "name": "Dhdb",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 1,
            "avatar": "images/uploads/4c72d8ac63711879718a5b87055f41dd.png",
            "coins": 131,
            "country": null,
            "email": "charleslebastard@hotmail.fr",
            "expoPushToken": "",
            "id": 4,
            "login": "Nalmanak",
            "name": "Charles",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": null,
            "coins": 110,
            "country": null,
            "email": "antoine.dury@epitech.eu",
            "expoPushToken": "",
            "id": 3,
            "login": "Anto",
            "name": "Antoine",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": null,
            "coins": 110,
            "country": null,
            "email": "Momo@gmail.com",
            "expoPushToken": "",
            "id": 19,
            "login": "Momo",
            "name": "Momo",
            "password": "bf7420009c1334246948291c7df7925d25d8c1d845e822b54a418d28d6fc0a482c0229f06b177af26fb00fec0e876d13739e994af139f893cc61c7972929634c",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }, {
            "additionalInformation": null,
            "address": null,
            "admin": 0,
            "avatar": "images/uploads/b77036a7cb9344dfc7b901e07097e036.png",
            "coins": 0,
            "country": null,
            "email": "a.a@a.fr",
            "expoPushToken": "",
            "id": 15,
            "login": "Altan",
            "name": "",
            "password": "43102984a36d9196dd2d92cf10de63cd44226bcc6f8e5135a9780a9c8303a44fb687ba6134b4d4b68259aac57d7ff0f2ab6ca877019b75752dda8cf03a1c18ac",
            "phone": null,
            "reward": 1,
            "rewardTier": 1,
            "rewardValue": 10,
            "tier": 1,
            "zipCode": null,
        }];
        resolve(res);
    }));
}

module.exports = UsersService;
