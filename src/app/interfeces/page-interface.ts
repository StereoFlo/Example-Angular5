export interface PageInterface {
    success: boolean;
    message: string;
    data: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    };
}
