export class CategoryDto {
    id!: number;
    name!: string;
    icon!: string;

    public static GetInstanceWithDefaultValues(): CategoryDto {
        return {
            id: 0,
            name: "",
            icon: "",
        };
    }
}