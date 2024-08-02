import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
interface ReturnType {
  id: string,
  done: boolean
}

//import { ActivatedRoute,RouterModule, Routes } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class YtServiceService {
  // [x: string]: any;
  // private route: ActivatedRoute,
  constructor(private http: HttpClient, private titleService: Title) { }
  // title:string=""; use 9000  27017
  async getLastLogin(): Promise<string> {
    let lastLoginMsg = "";
    // let l = sessionStorage.getItem('idcard');
    // if (l==null)  l="";
    // let idcard=l?.toString();
    // let url = "https://dbdoh.doh.go.th:9000/findLastLogin?idcard=" + sessionStorage.getItem('idcard');
    let url = this.url + "/findLastLogin?idcard=" + sessionStorage.getItem('idcard');//sessionStorage.getItem('idcard');

    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Access-Control-Allow-Origin', '*')

    }
    try {
      await firstValueFrom
        (this.http.post<ReturnType>(url, header)).
        then((response: any) => {
          //let j = JSON.stringify(response);
          // let obj2: LoginApi = JSON.parse(j);
          // console.log(response);
          // console.log("success");
          // alert("found:"+response["found"].toString());
          let lastLoginMsg = Object.keys(response)[0];// response["found"].toString() == "true" ? true : false;
          sessionStorage.setItem("last", lastLoginMsg);
          // sessionStorage.setItem("thaid", Object.keys(response)[1]);
          // alert(this.lastLoginMsg)
          return lastLoginMsg;

        });

    }
    catch (err) {

      // this.display = true;
      console.log("error");
      console.log(err);

    }
    return lastLoginMsg;
  }

  async insertLastLogin(app: string): Promise<void> {
    let type: string = "W";
    // let x = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // let last=x?.toString();
    let last = "";
    let DateObj = new Date();

    let y = DateObj.getFullYear() + 543 + "";
    let m = ('0' + (DateObj.getMonth() + 1)).slice(-2);
    let d = ('0' + DateObj.getDate()).slice(-2);
    let t = "  " + DateObj.getHours() + ":" + DateObj.getMinutes() + ":" + DateObj.getSeconds();
    last = d + "/" + m + "/" + y + t;
    let url = this.url + "/insertLastLogin?idcard=" +
      sessionStorage.getItem("idcard") +
      "&type=" +
      type +
      "&last='" +
      last +
      "'&app=" +
      app;


    let header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json;charset=UTF-8')
        .set('Access-Control-Allow-Origin', '*')

    }
    try {
      await firstValueFrom
        (this.http.post<void>(url, header)).
        then((response: any) => {
          //let j = JSON.stringify(response);
          // let obj2: LoginApi = JSON.parse(j);
          // console.log(response);
          // console.log("success");
          // alert("found:"+response["found"].toString());
          // this.lastLoginMsg = Object.keys(response)[0];// response["found"].toString() == "true" ? true : false;
          // sessionStorage.setItem("last", this.lastLoginMsg);
          // alert(this.lastLoginMsg)
          return;

        });

    }
    catch (err) {

      // this.display = true;
      console.log("error");
      console.log(err);

    }
  }
  /*private _loginBy = "";
  public get loginBy() {
    return this._loginBy;
  }
  public set loginBy(value) {
    this._loginBy = value;
  }
*/

  private _url = 'https://dbdoh.doh.go.th:9000'; //develop dbdoh production backupdoh
  public get url() {
    return this._url;
  }
  private _redirect_url = "https://dbdoh.doh.go.th/yt";
  // private _redirect_url = "http://localhost:4200/yt";
  public get redirect_url() {
    return this._redirect_url;
  }
  // public set url(value) {
  //   this._url = value;
  // }

  private _monthName = [
    {
      name: 'มกราคม',
      month: '01'
    },
    {
      name: 'กุมภาพันธ์',
      month: '02'
    },
    {
      name: 'มีนาคม',
      month: '03'
    },
    {
      name: 'เมษายน',
      month: '04'
    },
    {
      name: 'พฤษภาคม',
      month: '05'
    },
    {
      name: 'มิถุนายน',
      month: '06'
    },
    {
      name: 'กรกฎาคม',
      month: '07'
    },
    {
      name: 'สิงหาคม',
      month: '08'
    },
    {
      name: 'กันยายน',
      month: '09'
    },
    {
      name: 'ตุลาคม',
      month: '10'
    },
    {
      name: 'พฤศจิกายน',
      month: '11'
    },
    {
      name: 'ธันวาคม',
      month: '12'
    }
  ];
  public get monthName() {
    return this._monthName;
  }
  // public set monthName(value) {
  //   this._monthName = value;
  // }

  setTitle(title: string): void {
    // this.route.queryParams
    // .subscribe(params => {
    //   // console.log(params); // { orderby: "price" }
    //   this.title = params.title;
    //   console.log(this.title); // price
    // this.route.queryParams
    // .subscribe(params => {
    //   // console.log(params); // { orderby: "price" }
    //   this.title = params.title;
    //   console.log(this.title); // price
    this.titleService.setTitle(title);
  }



}
