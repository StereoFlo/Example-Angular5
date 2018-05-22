import {PageInterface} from '../interfeces/page-interface';
import {ResponseInterface} from '../interfeces/response-interface';

export class Page implements PageInterface, ResponseInterface {
    message: '';
    success: false;
    data: {
        pageId: '';
        title: '';
        content: '';
        slug: '';
        isDefault: false;
        createdAt: '';
        updatedAt: '';
    };

    constructor(values: Object = {}) {
        if (values) {
            Object.assign(this, values);
        }
    }
}
