import User from '../../src/classes/user';

class MockNotification{
    checkToken = jest.fn();
}

describe("User", () => {
    describe("functionalities", () => {
        User.notificationCenter = new MockNotification();
        let userInfos =
            {
                id: 0,
                login: "login",
                firstName: "firstName",
                email: "email",
                coins: 0,
                address: null,
                additionalInformation: null,
                zipCode: null,
                country: null,
                phone: null,
                avatar: null,
                reward: 0,
                rewardTier: 1,
                rewardValue: 10,
                expoPushToken: "token"
            };

        let userInfosFalse =
            {
                id: 0,
                login: "login",
                firstName: "firstName",
                email: "email",
                coins: 0,
                address: "address",
                additionalInformation: "additionalInformation",
                zipCode: "zipCode",
                country: "country",
                phone: "phone",
                avatar: "avatar",
                reward: 1,
                rewardTier: 1,
                rewardValue: 10,
                expoPushToken: "token"
            };

        it("Should instantiate the class", () => {
            let user = new User();
            expect(user).to.be.an.instanceOf(User);
        });

        it("Should set the user with all ternaries true", () => {
            User.setUser(userInfos);
            expect(User.id).to.be.equal(0);
            expect(User.login).to.be.equal("login");
            expect(User.firstName).to.be.equal("firstName");
            expect(User.coins).to.be.equal(0);
            expect(User.email).to.be.equal("email");
            expect(User.address).to.be.equal("");
            expect(User.additionalInformation).to.be.equal("");
            expect(User.zipCode).to.be.equal("");
            expect(User.country).to.be.equal("");
            expect(User.phone).to.be.equal("");
            expect(User.avatar).to.be.equal(null);
            expect(User.reward).to.be.equal(true);
            expect(User.rewardTier).to.be.equal(1);
            expect(User.rewardValue).to.be.equal(10);
            expect(User.expoPushToken).to.be.equal("token");
        });

        it("Should set the user with all ternaries false", () => {
            User.setUser(userInfosFalse);
            expect(User.id).to.be.equal(0);
            expect(User.login).to.be.equal("login");
            expect(User.firstName).to.be.equal("firstName");
            expect(User.coins).to.be.equal(0);
            expect(User.email).to.be.equal("email");
            expect(User.address).to.be.equal("address");
            expect(User.additionalInformation).to.be.equal("additionalInformation");
            expect(User.zipCode).to.be.equal("zipCode");
            expect(User.country).to.be.equal("country");
            expect(User.phone).to.be.equal("phone");
            expect(User.avatar).not.to.be.equal(null);
            expect(User.reward).to.be.equal(false);
            expect(User.rewardTier).to.be.equal(1);
            expect(User.rewardValue).to.be.equal(10);
            expect(User.expoPushToken).to.be.equal("token");
        });

        it("Should update the user with all ternaries true", () => {
            User.updateUser(userInfos);
            expect(User.email).to.be.equal("email");
            expect(User.address).to.be.equal("");
            expect(User.additionalInformation).to.be.equal("");
            expect(User.zipCode).to.be.equal("");
            expect(User.country).to.be.equal("");
            expect(User.phone).to.be.equal("");
        });

        it("Should update the user with all ternaries false", () => {
            User.updateUser(userInfosFalse);
            expect(User.email).to.be.equal("email");
            expect(User.address).to.be.equal("address");
            expect(User.additionalInformation).to.be.equal("additionalInformation");
            expect(User.zipCode).to.be.equal("zipCode");
            expect(User.country).to.be.equal("country");
            expect(User.phone).to.be.equal("phone");
        });

        it("Should set the user disconnected", () => {
            User.setUser(userInfos);
            User.disconnect();
            expect(User.id).to.be.equal(undefined);
            expect(User.login).to.be.equal(undefined);
            expect(User.firstName).to.be.equal(undefined);
            expect(User.coins).to.be.equal(undefined);
            expect(User.email).to.be.equal(undefined);
            expect(User.address).to.be.equal(undefined);
            expect(User.additionalInformation).to.be.equal(undefined);
            expect(User.zipCode).to.be.equal(undefined);
            expect(User.country).to.be.equal(undefined);
            expect(User.phone).to.be.equal(undefined);
            expect(User.avatar).to.be.equal(undefined);
            expect(User.reward).to.be.equal(false);
            expect(User.rewardTier).to.be.equal(undefined);
            expect(User.rewardValue).to.be.equal(undefined);
            expect(User.expoPushToken).to.be.equal("token");
        });
    });
});