export interface LoginInterface {
    success: boolean;
    message: string;
    data: {
        token: string
    };
}
