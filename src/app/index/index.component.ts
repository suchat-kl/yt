import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { LoginApi } from '../login-api';
import { LoginThaID } from '../login-thaid';
import { UserDetail } from '../user-detail';
// import {Title} from "@angular/platform-browser";
import { YtServiceService } from '../yt-service.service'
interface ReturnType {
  id: string,
  done: boolean
}


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  [x: string]: any;
  // title:string="";
  // private titleService:Title
  accessToken: string = "";

  
  constructor(
    private routeParam: ActivatedRoute, 
    // private ytSv: YtServiceService, 
    // private http: HttpClient

    private http: HttpClient, private route: Router, 
    
       private ytSv: YtServiceService 
) {
    
    
  }
  // token:string="";
  // doc:string="";
  //cntUsr="";
  msg: string = "";
 async ngOnInit(): Promise<void> {
 
    // this.doc = "https://kkumail-my.sharepoint.com/:b:/p/suchat_kl/EQ5OPSG03_tKvNflOhTiFZ8B6765KK9cEWOGQCtWX-emgQ";
    // this.cntUsr=sessionStorage.getItem("cntUsr")+"";
    this.routeParam.queryParams
      .subscribe(async params => {
        // console.log(params); // { orderby: "price" }
        // this.title = params.title;
        // console.log(this.title); // price
        //this.titleService.setTitle(this.title);

        if (params['title'] == null) {
          this.ytSv.setTitle("ดาวน์โหลดเอกสารภาษีประจำปี");
        }
        else { this.ytSv.setTitle(params['title']); }
        // alert(params['state']);
        // alert(params['code']);
        if (params['error'] != null) {
         this.msg= "ผู้ใช้งานไม่ยอมรับการให้ข้อมูล";

          alert(this.msg);
        }
       else if (params['code'] != null) {
          this.accessToken = params['code'];
          await this.loginBythID();
        }

      }
      );
    // if (!sessionStorage.getItem("token")==null){

    // this.token= (localStorage.getItem('token') || '') ;
    // console.log(this.token);
    //  }
  }
  pid:string="";userDoh:boolean=false;
async validIdcard(idcard:string):Promise<void>{
  // found:Boolean;
  this.userDoh=false;
  let header = {
    headers: new HttpHeaders()
      // .set('Authorization', "Basic Ym5WelEySjFOWFV3WW5WM05tcHdkV1JEY0dsd1lXZFhhM0I0ZW1WNGFIbzpkbGQ2YmtsMWVuTTBPVXN3YW10UGNuTTRWelJTWVhoQmJXOVJhVE00U0hGa2MyRnlUMG80Tnc=")
      .set('Content-Type', 'application/json;charset=UTF-8')
      // .set('Accept', 'application/json;charset=UTF-8')   
      .set('Access-Control-Allow-Origin', '*')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      // .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


  }
  // let url ="https://imauth.bora.dopa.go.th/api/v2/oauth2/token/";
  let url = "https://dbdoh.doh.go.th:9000/isValidIdcard/" + idcard;
 
  let body = new URLSearchParams();
  // body.set("grant_type", "authorization_code");
  // body.set("code", this.accessToken);
  // body.set("redirect_uri", "http://localhost:4200/yt");//""+sessionStorage.getItem("redirect_uri")?.toString()
  // console.log(this.accessToken);
  // console.log(body);
  // this.http.post(url, header).subscribe(map(res => ({
  //   done:res.found,
  // }))); 

  try {
    await firstValueFrom
      (this.http.post<ReturnType>(url, header)).
      then((response: any) => {
        //let j = JSON.stringify(response);
        // let obj2: LoginApi = JSON.parse(j);
        // console.log(response);
        // console.log("success");
// alert("found:"+response["found"].toString());
        this.userDoh = response["found"].toString() == "true" ? true : false;
        
       return ;
        
      });

  }
  catch (err) {

    // this.display = true;
    console.log("error");
    console.log(err);

  }



 
}
  async loginBythID(): Promise<void> {
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Basic Ym5WelEySjFOWFV3WW5WM05tcHdkV1JEY0dsd1lXZFhhM0I0ZW1WNGFIbzpkbGQ2YmtsMWVuTTBPVXN3YW10UGNuTTRWelJTWVhoQmJXOVJhVE00U0hGa2MyRnlUMG80Tnc=")
        .set('Content-Type', 'application/x-www-form-urlencoded')
      // .set('Accept', 'application/json')   
      .set('Access-Control-Allow-Origin', '*' )
      // .set('Access-Control-Allow-Credentials', 'true')     
      .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


    }
    // let url ="https://imauth.bora.dopa.go.th/api/v2/oauth2/token/";
      let url = 'https://corsproxy.io/?' +
      encodeURIComponent(
        "https://imauth.bora.dopa.go.th/api/v2/oauth2/token/");

    let body=new URLSearchParams();
    body.set("grant_type","authorization_code");
    body.set("code",this.accessToken );
    body.set("redirect_uri",this.ytSv.redirect_url);//""+sessionStorage.getItem("redirect_uri")?.toString()
  // console.log(this.accessToken);
  // console.log(body);
 this.http.post(url,body,header).subscribe(async (response:any)=>{
  // alert(response as string) ;
  // alert(response["pid"]);
   sessionStorage.setItem('idcard', response["pid"]);
    await this.validIdcard(response["pid"]);
   
   
   if (!this.userDoh ) {
    let msg:string = "ระบบงานนี้ใช้สำหรับข้าราชการลูกจ้างประจำกรมทางหลวง";
    alert(msg);
return;
   }
   
  // let j = JSON.stringify(response);
  //  // alert(JSON.parse(j));
  //  let obj2: LoginThaID = JSON.parse(j);
  //  alert(obj2.pid);
 });
 await this.logIn();
 
 
  
  
  } //method
  url: string = this.ytSv.url + '/login';

  loginJson = {

    "username": "gdbf-7ho9yh'vp^jfy[wx",
    "password": "fingerPrint@Doh"

  }
  async logIn() { //,{headers:""}
    // logIn() {
    try {//this.loginJson
      // await this.http.post(this.url, this.loginJson).toPromise().
      await firstValueFrom(this.http.post(this.url, this.loginJson)).
        then(response => {
          let j = JSON.stringify(response);
          let obj2: LoginApi = JSON.parse(j);
          sessionStorage.setItem("token", obj2.accessToken);
          sessionStorage.setItem('passLogin', 'true');
          // console.log(this.url);
          // console.log(this.loginJson);


        });

    }
    catch (err) {
      // catches errors both in fetch and response.json
      // alert(err);
      // this.display = true;
      sessionStorage.setItem('passLogin', 'false');
      return;
    }

// alert(sessionStorage.getItem('passLogin'));

    // let request = this.http.post(this.url, this.loginJson)
    //   .subscribe(response => {
    //     //console.log(JSON.stringify(response));
    //     let j=JSON.stringify(response);
    //     let obj2:LoginApi =JSON.parse(j) ;
    //     console.log(obj2.accessToken);
    //     //   this.token=j["accessToken"];
    //     sessionStorage.setItem("token", obj2.accessToken);
    //   }, error => {
    //     console.log(JSON.stringify(error));
    //   });

    // if (error!=null){
    //   console.log("login Fail");
    //   return;
    // }

    // console.log(obj2.accessToken);

    // console.log(this.response["tokenType"]);
    // console.log(this.response["accessToken"]);
    // console.log("**************************");

    // this.token +=this.response["accessToken"];
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token")) //   this.response["accessToken"])
        .set('Access-Control-Allow-Origin', '*')
    }
/*
    this.url = this.ytSv.url + '/userLogin/' + this.loginJson.username;
    console.log(this.url);
    
    // this.response = await this.http.get(this.url, header).toPromise();
    // console.log(this.response); <UserDetail[]>
    // this.http.get(this.url, header)
    //   .subscribe(response => {
    await firstValueFrom(this.http.get(this.url, header)).
      then(response => {
        //console.log(JSON.stringify(response));
        let j = JSON.stringify(response);
        //console.log(j);
        let obj2: UserDetail = JSON.parse(j);
        // console.log(JSON.stringify(obj2))
        // this.obj3=response;
        sessionStorage.setItem('userName', obj2.username);
        sessionStorage.setItem('id', (obj2.id).toString());
        sessionStorage.setItem('idcard', obj2.idcard);
        // console.log(obj2.username);
        // this.usr.userName=obj2[0].username;
        // console.log(this.usr.userName);
        // this.userName=sessionStorage.getItem('userName')+"";
        // console.log(obj2[0].username);
        // console.log(sessionStorage.getItem('userName'));
        // console.log(obj2[0].email);
        // console.log(obj2[0].roles);
        for (let index in obj2.roles) {
          // console.log(key);
          // console.log(obj2[0].roles[index].id);
          //1 upload file menu
          if (obj2.roles[index].id == 2) { //permission upload file
            //this.items[1].disabled=false;
            //this.mnuStatus["mnuUploadFile"]=false;
            sessionStorage.setItem("mnuFileUpload", "false");

          }
          if (obj2.roles[index].id == 1) { //permission download file
            //this.items[1].disabled=false;
            //this.mnuStatus["mnuUploadFile"]=false;
            sessionStorage.setItem("mnuFileDownload", "false");

          }
          //permission Login
          sessionStorage.setItem("mnuChangePwd", "false");
          sessionStorage.setItem("mnuResetPwd", "false");
          // this.showMenu();
          this.route.navigate(['/downloadfile']);

        }

        //console.log(obj2.);
        //   this.token=j["accessToken"];
        //sessionStorage.setItem("token", obj2.accessToken);
      }, error => {
        console.log(JSON.stringify(error));
      });
*/
    sessionStorage.setItem('userName', "");
    sessionStorage.setItem("mnuFileDownload", "false");
    sessionStorage.setItem("mnuChangePwd", "true");
    
    // this.showMenu();
    this.route.navigate(['/downloadfile']);

    // chk2Period
    // Map < String, String > res = new HashMap<>();
    this.url = this.ytSv.url + '/user2Period/' + sessionStorage.getItem("idcard");
    console.log(this.url);
    header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token")) //   this.response["accessToken"])
        .set('Access-Control-Allow-Origin', '*')
    }
    // this.response = await this.http.get(this.url, header).toPromise();
    // console.log(this.response); <UserDetail[]>
    // this.http.get(this.url, header)
    //   .subscribe(response => {
    await firstValueFrom(this.http.get(this.url, header)).
      then(response => {
        //console.log(JSON.stringify(response));
        let j = JSON.stringify(response);

        let obj5 = JSON.parse(j);
        // console.log(obj5);
        // console.log("***"+obj5.found+"*******");
        // console.log(JSON.stringify(obj2))
        // this.obj3=response;
        if (obj5.found == "true") {
          sessionStorage.setItem('has2Period', 'true');
          sessionStorage.setItem('year', obj5.year);


        }
        else {
          sessionStorage.setItem('year', '');
          sessionStorage.setItem('has2Period', 'false');
        }
        // alert('2period'+sessionStorage.getItem('has2Period'));
      }, error => {
        console.log(JSON.stringify(error));
      });
    //chk2Period

  } //login

}

