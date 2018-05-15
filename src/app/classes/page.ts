import {PageInterface} from '../interfeces/page-interface';
import {ResponseInterface} from '../interfeces/response-interface';

export class Page implements PageInterface, ResponseInterface {
    message: string;
    success: boolean;
    data: { pageId: string; title: string; content: string; slug: string; isDefault: boolean; createdAt: string; updatedAt: string };
}