export interface PageInterface {
    success: boolean;
    message: string;
    data: {
        pageId: string;
        title: string;
        content: string;
        slug: string;
        isDefault: boolean;
        createdAt: string;
        updatedAt: string;
    };
}
