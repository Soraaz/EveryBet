export class BetDto {
    id!: number;
    name!: string;
    description!: string;
    validate!: number;
    deadline!: number;
    finished!: boolean;

    public static GetInstanceWithDefaultValues(): BetDto {
        return {
            id: 0,
            name: "",
            description: "",
            validate: 0,
            deadline: 0,
            finished: false,
        };
    }
}