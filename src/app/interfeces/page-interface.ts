export interface PageInterface {
    success: boolean;
    message: string;
    data: {
        title: string;
        content: string;
        slug: string;
        isDefault: boolean;
        createdAt: string;
        updatedAt: string;
    };
}
