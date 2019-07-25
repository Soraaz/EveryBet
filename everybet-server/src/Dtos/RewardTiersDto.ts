export class RewardTiersDto {
    tier!: number;
    rewardValue!: number;

    public static GetInstanceWithDefaultValues(): RewardTiersDto {
        return {
            tier: 0,
            rewardValue: 0,
        };
    }
}