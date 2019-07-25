export class UserAnswerDto {
    userId!: number;
    answerId!: number;
    betId!: number;
    coins!: number;

    public static GetInstanceWithDefaultValues(): UserAnswerDto {
        return {
            userId: 0,
            answerId: 0,
            betId: 0,
            coins: 0,
        };
    }
}