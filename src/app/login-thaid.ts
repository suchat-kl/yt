// export class LoginApi {
//     tokenType:string="";
//     accessToken:string="";
//     // constructor(tokenType:string,accessToken:string){
//     //     this.accessToken=accessToken;
//     //     this.tokenType=tokenType;
//     // }
// }

export interface LoginThaID {
    expires_in:string    
    accessToken: string
    refresh_token:string
    token_type: string
    scope:string
    pid:string
    name:string
    birthdate:string
}
