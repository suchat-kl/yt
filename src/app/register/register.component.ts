import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ErrMsg } from '../errMsg';
import { RegisterFrm } from '../register-frm';
import { YtServiceService } from '../yt-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  :host ::ng-deep .p-password input {
    width: 9rem;
  }
`]
})
export class RegisterComponent implements OnInit {
  display: boolean = false;
  userName: string = "";
  password: string = "";
  idcard: string = "";
  msg_err: string = "";

  // data: any;
  constructor(private routeA: ActivatedRoute, private ytSv: YtServiceService,
    private route: Router, private http: HttpClient) { }


  async onclick(value: any) {
    let data = JSON.stringify(value);
    // console.log(data);

    let obj: RegisterFrm = JSON.parse(data);
    let body = {
      "name": "autoName",
      "username": "doh",
      "email": "6@doh.go.th",
      "password": "doh123",
      "idcard": "0000000000006"
    }
    body["password"] = obj.password;
    body["username"] = obj.userName;
    body["idcard"] = obj.idcard;

    // let bodyJson=JSON.stringify(body);
    //console.log(bodyJson);
    let url = this.ytSv.url + '/register';//    'http://dbdoh.doh.go.th:9000/register';// + sessionStorage.getItem('id');
    // let header = {
    //   headers: new HttpHeaders()
    //     .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
    // }
    //, header)

    try {
      // console.log(url);
      // console.log(body);
      await firstValueFrom (this.http.post(url, body)).
        then(response => {
          this.route.navigate(['']);
          //  console.log(response);
        }
        );
    }
    catch (error) {
      // catches errors both in fetch and response.json
      data = JSON.stringify(error);
      let obj: ErrMsg = JSON.parse(data);
      // alert(obj.error.message);
      this.msg_err = obj.error.message;


      this.display = true;
      // data = JSON.stringify(error);
      //     let obj: ErrMsg = JSON.parse(data);
      //     console.log(obj.message);
      //     alert(obj.message);
      return;
    }








    // this.http.post(url, body)
    //   .subscribe(response => {
    //     console.log(response);    
    //     this.route.navigate(['']);
    //   }, error => {
    //    // console.log(error);
    //     data = JSON.stringify(error);
    //     let obj: ErrMsg = JSON.parse(data);
    //     console.log(obj.message);
    //     alert("err");
    //   }
    //   )

  }
  ngOnInit(): void {
    this.routeA.queryParams
      .subscribe(params => {
        this.ytSv.setTitle(params['title']);
      }
      );
  }
}
