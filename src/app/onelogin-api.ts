// export class LoginApi {
//     tokenType:string="";
//     accessToken:string="";
//     // constructor(tokenType:string,accessToken:string){
//     //     this.accessToken=accessToken;
//     //     this.tokenType=tokenType;
//     // }
// }

export interface OneLoginApi {
    status:boolean
    code: string
    token: string
}
