// import { AppRoutingModule } from '../app-routing.module';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { UsrpwdForm } from '../usrpwd-form';
import { HttpClient } from '@angular/common/http';
import { LoginApi } from '../login-api';
import { OneLoginApi } from '../onelogin-api'
import { HttpHeaders } from '@angular/common/http';
import { UserDetail } from '../user-detail';
// import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { YtServiceService } from '../yt-service.service';
import { firstValueFrom } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
// import { DecimalPipe } from '@angular/common';

interface ReturnType {
  id: string,
  done: boolean
}





// `
//   :host ::ng-deep .p-password input {
//     width: 9rem;
//   }
// `
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [`
     :host ::ng-deep .p-password input {
       width: 9rem;
     }
   `],
  // providers: [MessageService]
})
export class MenuComponent implements OnInit {
[x: string]: any;
  thaidUrl: string = "";
  oneLoginUrl: string = "";
  displayHTML: any;
  items: MenuItem[] = [];
  passLogin = false;
  userNameShow: string = '';
  cntRegis?: string = "0";
  viewRep?: string = "0";

  _url: string = "";
  lastLoginMsg?: string = "";
  msg: string = "";
  visible: boolean = false;
  chk: any;
  state: Number = 0;
  display: boolean = false;
  onedisplay: boolean =this.ytSv.onedisplay;
  data: any;
  url: string = this.ytSv.url + '/login';
  urlThaid: string = "";
  loginJson = {

    "username": "",
    "password": ""

  }
  mnuStr = [
    { "index": "ดาวน์โหลดเอกสารภาษีประจำปี" },
    { "register": "ลงทะเบียนผู้ใช้งาน" },
    { "upload": "เตรียมข้อมูลภาษี/สลิป" },
    { "download": "ภาษี/สลิป" },
    { "changepwd": "เปลี่ยนรหัสผ่าน" },
    { "resetpwd": "กำหนดรหัสผ่านใหม่" },
    { "uploadimg": "เตรียมไฟล์ลายเซ็นต์" },
    { "manual": "คู่มือ" },

    { "changeusr": "เปลี่ยนชื่อผู้ใช้งาน" },
    { "paydate1": "ข้าราชการ/ลูกจ้างปัจจุบัน" },
    { "paydate2": "ผู้เกษียณ" },
  ];

  userDoh:boolean=false;


  // url: string = this.ytSv.url + '/login';

  loginJsonOneLogin = {

    "username": environment.usr,
    "password": environment.pwd,


  }
  // onedisplay_click(){
  //   this.ytSv.onedisplay=false;
  //   // this.dialogRef.close();
  // }
  async logInByOneLogin() { //,{headers:""}
    // logIn() {
    try {//this.loginJson
      // await this.http.post(this.url, this.loginJson).toPromise().
      await firstValueFrom(this.http.post(this.url, this.loginJsonOneLogin)).
        then(async response => {
          let j = JSON.stringify(response);
          let obj2: LoginApi = JSON.parse(j);
          sessionStorage.setItem("token", obj2.accessToken);
          sessionStorage.setItem('passLogin', 'true');
          // console.log(this.url);
          // console.log(this.loginJson);
          let lastLoginMsg = await this.ytSv.getLastLogin();
          this.ytSv.insertLastLogin("yt@OneLogin"); //not need to use await

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

    this.url = this.ytSv.url + '/postuserLogin/' ;//+ ;
    // console.log(this.url);
    const idcard_json = {
      "username": sessionStorage.getItem('idcard')
    }

    // this.response = await this.http.get(this.url, header).toPromise();
    // console.log(this.response); <UserDetail[]>
    // this.http.get(this.url, header)
    //   .subscribe(response => {
    await firstValueFrom(this.http.post(this.url,idcard_json, header)).
      then(response => {
        //console.log(JSON.stringify(response));
        let j = JSON.stringify(response);
        //console.log(j);
        let obj2: UserDetail = JSON.parse(j);
        // console.log(JSON.stringify(obj2))
        // this.obj3=response;
        sessionStorage.setItem('userName', obj2.username);
        sessionStorage.setItem('id', (obj2.id).toString());
        // sessionStorage.setItem('idcard', obj2.idcard);
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


        }
        //permission Login
        sessionStorage.setItem("mnuChangePwd", "false");
        sessionStorage.setItem("mnuResetPwd", "false");
        // this.showMenu();
        this.route.navigate(['/downloadfile']);

        //console.log(obj2.);
        //   this.token=j["accessToken"];
        //sessionStorage.setItem("token", obj2.accessToken);
      }, error => {
        // console.log(JSON.stringify(error));
      });

    // sessionStorage.setItem('userName', "");
    // sessionStorage.setItem("mnuFileDownload", "false");
    // sessionStorage.setItem("mnuChangePwd", "true");

    // this.showMenu();
    this.route.navigate(['/downloadfile']);

    // chk2Period
    // Map < String, String > res = new HashMap<>();
    const idcar_json={
      "idcard":sessionStorage.getItem("idcard")
    }
    this.url = this.ytSv.url + '/postuser2Period/';// + sessionStorage.getItem("idcard");
    // console.log(this.url);
    header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token")) //   this.response["accessToken"])
        .set('Access-Control-Allow-Origin', '*')
    }
    // this.response = await this.http.get(this.url, header).toPromise();
    // console.log(this.response); <UserDetail[]>
    // this.http.get(this.url, header)
    //   .subscribe(response => {
    await firstValueFrom(this.http.post(this.url,idcar_json, header)).
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
        // console.log(JSON.stringify(error));
      });
    //chk2Period

  } //login


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
    let url = this.ytSv.url+  "/isValidIdcard/" + idcard;
   
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
      // console.log("error");
      // console.log(err);
  
    }
  
  
  
   
  }
  showMenu() {
    this.passLogin = (sessionStorage.getItem("passLogin") === 'true');
    // this.userName =  sessionStorage.getItem('userName')+"" ;
    // console.log(this.userName);
    this.userNameShow = sessionStorage.getItem('userName') + "";
    let uploadFile = (sessionStorage.getItem("mnuFileUpload") === 'true');
    let downloadFile = (sessionStorage.getItem("mnuFileDownload") === 'true');
    let changePwd = (sessionStorage.getItem("mnuChangePwd") === 'true');
    //let resetPwd = (sessionStorage.getItem("mnuResetPwd") === 'true');
    this.items = [
      {
        label: 'หน้าแรก',
        icon: 'pi pi-fw pi-bookmark',
        routerLink: ['/'],
        queryParams: { 'title': this.mnuStr[0]["index"] },


      },
      {
        label: 'กำหนดวันจ่าย',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: this.mnuStr[9]["paydate1"],
            icon: 'pi pi-fw pi-user-plus',

            disabled: uploadFile,
            routerLink: ['/paydate'],
            queryParams: { 'title': this.mnuStr[9]["paydate1"] },
          },
          {
            label: this.mnuStr[10]["paydate2"],
            icon: 'pi pi-fw pi-user-minus',
            disabled: uploadFile,
            routerLink: ['/paydater'],
            queryParams: { 'title': this.mnuStr[10]["paydate2"] },

          }



        ]
      },




      // {
      //   label: this.mnuStr[7]["manual"],
      //   icon: 'pi pi-fw pi-bookmark',
      //   // routerLink: ['/'],
      //   url: "https://kkumail-my.sharepoint.com/:b:/p/suchat_kl/EQ5OPSG03_tKvNflOhTiFZ8B6765KK9cEWOGQCtWX-emgQ",
      //   target: "_blank",
      //   queryParams: { 'title': this.mnuStr[7]["manual"], "target": "_blank" },


      // },
      // {
      //   label: this.mnuStr[8]["paydate"],
      //   icon: 'pi pi-upload',
      //   disabled: uploadFile,
      //   routerLink: ['/paydate'],
      //   queryParams: { 'title': this.mnuStr[8]["paydate"] },

      // },
      {
        label: this.mnuStr[2]["upload"],
        icon: 'pi pi-upload',
        disabled: uploadFile,
        routerLink: ['/uploadfile'],
        queryParams: { 'title': this.mnuStr[2]["upload"] },


      },
      {
        label: this.mnuStr[6]["uploadimg"],
        icon: 'pi pi-upload',
        disabled: uploadFile,
        routerLink: ['/uploadimg'],
        queryParams: { 'title': this.mnuStr[6]["uploadimg"] },


      },
      {
        label: this.mnuStr[3]["download"],
        icon: 'pi pi-download',
        disabled: downloadFile,
        routerLink: ['/downloadfile'],
        queryParams: { 'title': this.mnuStr[3]["download"] },

      },
      {
        label: 'ผู้ใช้งาน',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: this.mnuStr[1]["register"],
            icon: 'pi pi-fw pi-user-plus',
            routerLink: ['/register'],
            queryParams: { 'title': this.mnuStr[1]["register"] },
          },
          {
            label: this.mnuStr[4]["changepwd"],
            icon: 'pi pi-fw pi-user-minus',
            disabled: changePwd,
            routerLink: ['/changepwd'],
            queryParams: { 'title': this.mnuStr[4]["changepwd"] },

          },
          {
            label: this.mnuStr[5]["resetpwd"],
            icon: 'pi pi-fw pi-user',
            // disabled: resetPwd,
            routerLink: ['/resetpwd'],
            queryParams: { 'title': this.mnuStr[5]["resetpwd"] },
          }
          ,
          {
            label: this.mnuStr[8]["changeusr"],
            icon: 'pi pi-fw pi-user',
            // disabled: resetPwd,
            routerLink: ['/changeusr'],
            queryParams: { 'title': this.mnuStr[8]["changeusr"] },
          }
        ]
      },

      {
        separator: true
      },

    ];

  }
  async checkOneLogin() {
    let url = "https://onelogin.doh.go.th:8080/api/authen";
    let body = {
      "code": "951a5a4c30311b4eb900a63dba9cf32428fc007f61af53f366585c461e3fc0d1",
    };
    sessionStorage.setItem('tokenOneLogin', "fail");
    try {//this.loginJson
      // await this.http.post(this.url, this.loginJson).toPromise().
      await firstValueFrom(this.http.post(url, body)).
        then(response => {
          let j = JSON.stringify(response);
          let obj2: OneLoginApi = JSON.parse(j);
          if (obj2.status && obj2.code == '200') {
            sessionStorage.setItem("status", "true");
            sessionStorage.setItem("code", "200");
            sessionStorage.setItem('tokenOneLogin', obj2.token);
          }
          // console.log(this.url);
          // console.log(this.loginJson);
          // this.ytSv.loginBy="userNamePwd";

        });

    }
    catch (err) {
      // catches errors both in fetch and response.json
      // alert(err);
      // this.display = true;
      // sessionStorage.setItem('passLogin', 'false');
      sessionStorage.setItem('tokenOneLogin', "fail");
      return;
    }

  }
  async loginOneLogin() {
    let url = "https://onelogin.doh.go.th:8080/api/user";
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("tokenOneLogin")) //   this.response["accessToken"])
    }

    try {//this.loginJson
      // await this.http.post(this.url, this.loginJson).toPromise().
      await firstValueFrom(this.http.get(url, header)).
        then(response => {
          let j = JSON.stringify(response);
          let obj2 = JSON.parse(j);
          if (obj2.status && obj2.code == '200') {
            sessionStorage.setItem("status", "true");
            sessionStorage.setItem("code", "200");
            sessionStorage.setItem('idcard', obj2.data[0].idcard);
            // alert(obj2.data[0].idcard);
          }

          // console.log(this.url);
          // console.log(this.loginJson);
          // this.ytSv.loginBy="userNamePwd";

        });

    }
    catch (err) {
      // catches errors both in fetch and response.json
      // alert(err);
      // this.display = true;
      // sessionStorage.setItem('passLogin', 'false');
      sessionStorage.setItem('tokenOneLogin', "fail");
      return;
    }

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
          // this.ytSv.loginBy="userNamePwd";

        });

    }
    catch (err) {
      // catches errors both in fetch and response.json
      // alert(err);
      this.display = true;
      sessionStorage.setItem('passLogin', 'false');
      return;
    }



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
// const idcard_json={
//   "username":this.loginJson.username
// }
   
    this.url = this.ytSv.url + '/userLogin/'+this.loginJson.username;
    // console.log(this.url);
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token")) //   this.response["accessToken"])
    }
    // this.response = await this.http.get(this.url, header).toPromise();
    // console.log(this.response); <UserDetail[]>
    // this.http.get(this.url, header)
    //   .subscribe(response => {
    await firstValueFrom(this.http.get(this.url, header)).
      then(async response => {
        //console.log(JSON.stringify(response));
        let j = JSON.stringify(response);
        //console.log(j);
        let obj2: UserDetail = JSON.parse(j);
        // console.log(JSON.stringify(obj2))
        // this.obj3=response;
        sessionStorage.setItem('userName', obj2.username);
        sessionStorage.setItem('id', (obj2.id).toString());
        sessionStorage.setItem('idcard', obj2.idcard);
        this.lastLoginMsg = await this.ytSv.getLastLogin();
        this.ytSv.insertLastLogin("yt"); //not need to use await
        // await this.getLastLogin();
        // alert(this.lastLoginMsg);
        // this.showMenu();
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


        }
        //permission Login
        sessionStorage.setItem("mnuChangePwd", "false");
        sessionStorage.setItem("mnuResetPwd", "false");
        this.showMenu();
        this.route.navigate(['/downloadfile']);

        //console.log(obj2.);
        //   this.token=j["accessToken"];
        //sessionStorage.setItem("token", obj2.accessToken);
      }, error => {
        // console.log(JSON.stringify(error));
      });
    // chk2Period
    // Map < String, String > res = new HashMap<>();
    // const idcar_json={
    //   "idcard":sessionStorage.getItem("idcard")
    // }
    this.url = this.ytSv.url + '/user2Period/' + sessionStorage.getItem("idcard");
    // console.log(this.url);
    header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token")) //   this.response["accessToken"])
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
        // console.log(JSON.stringify(obj5))
        
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
        // console.log(JSON.stringify(error));
      });
    //chk2Period


    // alert(this.lastLoginMsg);
  } //login


  logOut() {
    // this.ytSv.loginBy="";
    this.passLogin = false;
    // alert(sessionStorage.getItem('has2Period'));
    //sessionStorage.removeItem("cntUsr");
    // sessionStorage.removeItem("redirect_uri");
    sessionStorage.removeItem("status");
    sessionStorage.removeItem("code");
    sessionStorage.removeItem('tokenOneLogin');
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("passLogin");
    sessionStorage.removeItem("mnuFileUpload");
    sessionStorage.removeItem("mnuFileDownload");
    sessionStorage.removeItem("mnuChangePwd");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("idcard");
    sessionStorage.removeItem("has2Period");
    sessionStorage.removeItem("year");
    sessionStorage.removeItem("cnt");
    sessionStorage.removeItem("last");
    sessionStorage.removeItem('viewRep');
    this.route.navigate(['/register']);
    this.route.navigate(['']);
    this.usr.userName = "";
    // this.cntUsr();
    this.showMenu();
  }
  onclick(value: any): void {
    // if (this.thaid){
    //    alert(this.thaid);
    //   this.urlThaid ="https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=bnVzQ2J1NXUwYnV3NmpwdWRDcGlwYWdXa3B4emV4aHo&redirect_uri=https://dbdoh.doh.go.th/thaidcallback&scope=pid%20name%20birthdate&state=gTvgsHomhv'ahkoyjows,";
    //   this.http.get("urlThaid", { responseType: "text" }).subscribe(response => {
    //     this.displayHTML = this.sanitizer.bypassSecurityTrustHtml(response);
    //   })

    //    return;
    // }



    if (this.passLogin) {
      this.logOut();

      return;
    }
    // else {
    // this.usr.onclick(value);
    // this.display = (sessionStorage.getItem("display") == "true");
    // this.passLogin = (sessionStorage.getItem("passLogin") == "true");
    // this.showMenu();
    // }

    // console.log(JSON.stringify(value));
    this.data = JSON.stringify(value);
    // console.log(this.data);

    // console.log(value["userName"]);
    // console.log(value["password"]);

    let obj: UsrpwdForm = JSON.parse(this.data);

    // console.log(obj.userName);
    // console.log(obj.password);
    this.loginJson["username"] = obj.userName;
    this.loginJson["password"] = obj.password;
    // this.cntUsr();
    /*
        if (this.ytSv.loginBy==""){}
    else {
      
      switch (this.ytSv.loginBy){
        case "userNamePwd": this.msg ="มีการเข้าระบบด้วยการใช้ชื่อและรหัสผ่านแล้ว";break;
        case "thaID": this.msg ="มีการเข้าระบบด้วยการใช้แอปThaIDแล้ว";break;
        default:
      }
      alert(this.msg);
      return;
    }
    */

    this.logIn();

  }
  // response: any;
  // error: any;
  // token: string = "";
  // logInApi: LoginApi | undefined;
  // obj3:UserDetail[]=[];
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  async cntUsr() {

    this._url = this.ytSv.url + '/cntRigisterStr';
    try {//this.loginJson
      await firstValueFrom(this.http.get(this._url)).
        then(response => {
          let j = JSON.stringify(response);
          let d = JSON.parse(j);
          // sessionStorage.setItem("cntUsr", j);
          this.cntRegis = d.thaid + "/" + d.total;//
          this.viewRep = d.viewRep;
          // this.viewRep = this.decimalPipe.transform(Number(this.viewRep), '1.0-0');

          // alert(j);
          sessionStorage.setItem("cnt", this.cntRegis.toString());
          sessionStorage.setItem("viewRep", d.viewRep.toString());
          // alert("cnt"+this.cntRegis);
        });

    }
    catch (err) { }
  }


  constructor(private http: HttpClient, private route: Router, private usr: UserService
    , private ytSv: YtServiceService, private sanitizer: DomSanitizer) {//, private decimalPipe: DecimalPipe) {
    // alert("1.constructor");

  }
  async ngOnInit(): Promise<void> {
    // alert("2.menu oninit");
    if (sessionStorage.getItem('idcard') == null) {
      sessionStorage.setItem('idcard', '');
    }
    if (sessionStorage.getItem('cnt') == null) {
      sessionStorage.setItem('cnt', '0');
    }
    if (sessionStorage.getItem('viewRep') == null) {
      sessionStorage.setItem('viewRep', '0');
    }

    if (sessionStorage.getItem('last') == null) {
      sessionStorage.setItem('last', '');
    }

    if (sessionStorage.getItem('userName') == null) {
      sessionStorage.setItem('userName', '');
    }
    if (sessionStorage.getItem('passLogin') == null) {
      sessionStorage.setItem('passLogin', 'false');
    }
    if (sessionStorage.getItem("mnuFileUpload") == null) {
      sessionStorage.setItem("mnuFileUpload", "true");
    }
    if (sessionStorage.getItem("mnuFileDownload") == null) {
      sessionStorage.setItem("mnuFileDownload", "true");
    }
    if (sessionStorage.getItem("mnuChangePwd") == null) {
      sessionStorage.setItem("mnuChangePwd", "true");
    }
    //  this.chk=sessionStorage.getItem("cntUsr")+"";
    if (sessionStorage.getItem("cnt") == "0") { await this.cntUsr(); }
    else {
      let x = sessionStorage.getItem("cnt") == null ? "0" : sessionStorage.getItem("cnt");
      this.cntRegis = x?.toString();
      x = sessionStorage.getItem("viewRep") == null ? "0" : sessionStorage.getItem("viewRep");
      this.viewRep = x?.toString();

    }
    if (sessionStorage.getItem("last") == "") { }
    else {
      let x = sessionStorage.getItem("last") == null ? "" : sessionStorage.getItem("last");
      this.lastLoginMsg = x?.toString();
    }
    this.showMenu();
    this.state = this.getRandomInt(1, 100);
    // this.thaidUrl = "https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=SEFuR3NrdldHV1NyTjdmMnlrU2lkaTVnZTFERldBSWU&redirect_uri=" + this.ytSv.redirect_url + "&scope=pid&state=" + this.state;
    this.thaidUrl = "https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=SEFuR3NrdldHV1NyTjdmMnlrU2lkaTVnZTFERldBSWU&redirect_uri=" + this.ytSv.redirect_url + "&scope=pid&state=" + this.state;
    this.oneLoginUrl = "https://onelogin.doh.go.th/login?code=951a5a4c30311b4eb900a63dba9cf32428fc007f61af53f366585c461e3fc0d1";
    let chk: any = sessionStorage.getItem('stopOneLogin');
    if (chk == null ) {
    } else if (chk == "true") {
      return;
    }
    await this.checkOneLogin();
    if (sessionStorage.getItem('tokenOneLogin') == "fail") {

    }
    else {
      await this.loginOneLogin(); //get idcard from one login
      let idcard:any = sessionStorage.getItem('idcard');
      await this.validIdcard(idcard);


      if (!this.userDoh) {
        this.msg = "ระบบงานนี้ใช้สำหรับข้าราชการลูกจ้างประจำกรมทางหลวง";
        // this.visible = true;
        alert(this.msg);
        return;
      }
      else {
        await this.logInByOneLogin(); //login to slip tax
        sessionStorage.setItem('stopOneLogin',"true")
      }

    }

  }



}




