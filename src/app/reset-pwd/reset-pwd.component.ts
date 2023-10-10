import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ErrMsg } from '../errMsg';
import { ResetpwdFrm } from '../resetpwd-frm';
import { ResetpwdOutput } from '../resetpwd-output';
import { YtServiceService } from '../yt-service.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styles: [`
  :host ::ng-deep .p-password input {
    width: 9rem;
  }
`]
})
export class ResetPwdComponent implements OnInit {
  display: boolean = false;
  userName: string = "ชื่อจะปรากฏหลังบันทึก";
  password: string = "";
  idcard: string = "";
  msg_err: string = "";
  bd: string = "";
  // data: any;
  constructor(private routeA: ActivatedRoute, private ytSv: YtServiceService,
    private route: Router, private http: HttpClient) { }
  async onclick(value: any) {
    let data = JSON.stringify(value);
    // console.log(data);


    let obj: ResetpwdFrm = JSON.parse(data);
    let body = {
      "name": "autoName",
      "username": "doh",
      "email": "6@doh.go.th",
      "password": "doh123",
      "idcard": "0000000000006"
    }
    body["password"] = obj.password;
    // body["username"] = obj.userName;
    body["idcard"] = obj.idcard;
    let bd = obj.bd; //same value this.bd
    // let idcard=obj.idcard;

    let url = this.ytSv.url + "/resetpwd/1?bd=" + bd;
    await firstValueFrom( this.http.put(url, body)).
      then(response => {
        let data = JSON.stringify(response);
        let obj: ResetpwdOutput = JSON.parse(data);
        this.userName = obj.username;
      }, error => {
        // console.log(error);
        this.display = true;
        data = JSON.stringify(error);
        let obj: ErrMsg = JSON.parse(data);
        // alert(obj.error.message);
        this.msg_err = obj.error.message;


      });




    // let bodyJson=JSON.stringify(body);
    //console.log(bodyJson);
    //http://dbdoh.doh.go.th:9000/resetpwd/3?bd=888888
    /*
    let url = 'http://dbdoh.doh.go.th:9000/resetpwd';
      this.http.post(url, body)
      .subscribe(response => {
        console.log(response);    
        this.route.navigate(['']);
      }, error => {
       // console.log(error);
        data = JSON.stringify(error);
        let obj: ErrMsg = JSON.parse(data);
        console.log(obj.message);
        alert("err");
      }
      );
      */
  }

  ngOnInit(): void {
    this.routeA.queryParams
      .subscribe(params => {
        this.ytSv.setTitle(params['title']);
      }
      );
  }

}
