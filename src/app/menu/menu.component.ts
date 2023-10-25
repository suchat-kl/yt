// import { AppRoutingModule } from '../app-routing.module';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { UsrpwdForm } from '../usrpwd-form';
import { HttpClient } from '@angular/common/http';
import { LoginApi } from '../login-api';
import { HttpHeaders } from '@angular/common/http';
import { UserDetail } from '../user-detail';
// import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { UserService } from '../user.service';
import { YtServiceService } from '../yt-service.service';
import { firstValueFrom } from 'rxjs';







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
export class MenuComponent {
  // title = 'ดาวน์โหลดเอกสารภาษีประจำปี';
  // userName:any;
  // password="" ;
  cntRegis: number = 0;
  _url: string = "";
  async cntUsr() {
    this._url = this.ytSv.url + '/cntRigister';
    try {//this.loginJson
      await firstValueFrom(this.http.get(this._url)).
        then(response => {
          let j = JSON.stringify(response);

          // sessionStorage.setItem("cntUsr", j);
          this.cntRegis = parseInt(j);

        });

    }
    catch (err) { }
  }
  chk: any;
  ngOnInit() {
    //  this.chk=sessionStorage.getItem("cntUsr")+"";
    if (this.cntRegis == 0) { this.cntUsr(); }
    this.showMenu();
    // this._url = this.ytSv.url + '/cntRigister';
    // this.http.get(this._url)
    //   .subscribe(response => {
    //     //console.log(JSON.stringify(response));
    //     let j = JSON.stringify(response);
    //     // console.log(j);
    //     sessionStorage.setItem("cntUsr", j);
    //   });

  }
  display: boolean = false;
  data: any;
  url: string = this.ytSv.url + '/login';
  loginJson = {

    "username": "",
    "password": ""

  }
  // response!: LoginApi;
  constructor(private http: HttpClient, private route: Router, private usr: UserService
    , private ytSv: YtServiceService) {
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
    // if (sessionStorage.getItem("mnuResetPwd") == null) {
    //   sessionStorage.setItem("mnuResetPwd", "true");
    // }
  }

  logOut() {
    this.passLogin = false;
    //sessionStorage.removeItem("cntUsr");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("passLogin");
    sessionStorage.removeItem("mnuFileUpload");
    sessionStorage.removeItem("mnuFileDownload");
    sessionStorage.removeItem("mnuChangePwd");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    this.showMenu();
    this.route.navigate(['/register']);
    this.route.navigate(['']);
    this.usr.userName = "";
    this.cntUsr();
  }
  onclick(value: any): void {
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
    this.cntUsr();
    this.logIn();

  }
  // response: any;
  // error: any;
  // token: string = "";
  // logInApi: LoginApi | undefined;
  // obj3:UserDetail[]=[];

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


    this.url = this.ytSv.url + '/userLogin/' + this.loginJson.username;
    console.log(this.url);
    let header = {
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
          this.showMenu();
          this.route.navigate(['/downloadfile']);

        }

        //console.log(obj2.);
        //   this.token=j["accessToken"];
        //sessionStorage.setItem("token", obj2.accessToken);
      }, error => {
        console.log(JSON.stringify(error));
      });


  }

  // mnuStatus={"mnuUploadFile":true,"mnuDownloadFile":true};
  items: MenuItem[] = [];

  // ngOnInit() {
  //   this.items = [{
  //       label: 'File',
  //       items: [
  //           {label: 'New', icon: 'pi pi-plus', url: 'http://www.primefaces.org/primeng'},
  //           {label: 'Open', icon: 'pi pi-download', routerLink: ['/pagename']}
  //           {label: 'Recent Files', icon: 'pi pi-download', routerLink: ['/pagename'], queryParams: {'recent': 'true'}}
  //       ]
  //   }
  //routerLinkActiveOptions:  { exact: true }
  passLogin = false;
  userNameShow: string = '';
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
      // {
      //   label: this.mnuStr[7]["manual"],
      //   icon: 'pi pi-fw pi-bookmark',
      //   // routerLink: ['/'],
      //   url: "https://kkumail-my.sharepoint.com/:b:/p/suchat_kl/EQ5OPSG03_tKvNflOhTiFZ8B6765KK9cEWOGQCtWX-emgQ",
      //   target: "_blank",
      //   queryParams: { 'title': this.mnuStr[7]["manual"], "target": "_blank" },


      // },
      {
        label: this.mnuStr[8]["paydate"],
        icon: 'pi pi-upload',
        disabled: uploadFile,
        routerLink: ['/paydate'],
        queryParams: { 'title': this.mnuStr[8]["paydate"] },

      },
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
        ]
      },

      {
        separator: true
      },

    ];

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
    { "paydate": "วันที่จ่าย" }
  ];
//"ดาวน์โหลดไฟล์ภาษีสลิปเงินเดือน"
}

