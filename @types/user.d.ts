interface IUser {
    id: number;
    email: string;
    is_owner: boolean;
    phone_number: string | null;
    username: string;
    name?: string;
}