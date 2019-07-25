export class UserDto {
    id!: number;
    name!: string;
    email!: string;
    login!: string;
    password!: string;
    coins!: number;
    address!: string;
    additionalInformation!: string;
    zipCode!: string;
    country!: string;
    phone!: string;
    avatar!: string;
    expoPushToken!: string;

    public static GetInstanceWithDefaultValues(): UserDto {
        return {
            id: 0,
            name: "",
            email: "",
            login: "",
            password: "",
            coins: 0,
            address: "",
            additionalInformation: "",
            zipCode: "",
            country: "",
            phone: "",
            avatar: "",
            expoPushToken: "",
        };
    }
}