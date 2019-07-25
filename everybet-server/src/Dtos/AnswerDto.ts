export class AnswerDto {
    id!: number;
    answer!: string;
    betId!: number;

    public static GetInstanceWithDefaultValues(): AnswerDto {
        return {
            id: 0,
            answer: "",
            betId: 0,
        };
    }
}