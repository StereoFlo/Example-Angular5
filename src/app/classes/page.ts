import {PageInterface} from '../interfeces/page-interface';

export class Page implements PageInterface{
    message: string;
    success: boolean;
    data: { title: string; content: string; slug: string; isDefault: boolean; createdAt: string; updatedAt: string };
}