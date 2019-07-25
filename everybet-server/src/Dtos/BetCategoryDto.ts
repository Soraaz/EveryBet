export class BetCategoryDto {
    betId!: number;
    categoryId!: number;

    public static GetInstanceWithDefaultValues(): BetCategoryDto {
        return {
            betId: 0,
            categoryId: 0,
        };
    }
}