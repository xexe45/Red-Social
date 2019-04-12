export class Usuario {
    constructor(
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public birthday: string,
        public sex: string,
        public slug?: string,
        public img?: string,
        public imgfondo?: string,
        public _id?: string
    ) { }
}
