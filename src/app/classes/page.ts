import {PageInterface} from '../interfeces/page-interface';
import {ResponseInterface} from '../interfeces/response-interface';

export class Page implements PageInterface, ResponseInterface {
    message: string;
    success: boolean;
    data: {
        pageId: '';
        title: '';
        content: '';
        slug: '';
        isDefault: false;
        createdAt: '';
        updatedAt: '';
    };
}
