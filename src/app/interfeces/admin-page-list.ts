export interface AdminPageList {
    success: boolean;
    message: string;
    data: [{
        content: string;
        isDefault: boolean;
        slug: string;
        title: string;
        createdAt: {},
        updatedAt: {},
    }];
}
