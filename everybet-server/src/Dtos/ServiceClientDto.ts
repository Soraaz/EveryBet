export class ServiceClientDto {
    id!: number;
    betId!: number;
    userId!: number;
    message!: string;

    public static GetInstanceWithDefaultValues(): ServiceClientDto {
        return {
            id: 0,
            betId: 0,
            userId: 0,
            message: ""
        };
    }
}