import { Like } from './like.model';
export class Post {
    constructor(
        public user_id: any,
        public post: string,
        public img?: string,
        public likes?: Like[],
        public created_at?: Date,
        public _id?: string,
    ) {

    }
}
