import { Component, OnInit } from '@angular/core';
import { YtServiceService } from '../yt-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsrpwdForm } from '../usrpwd-form';
import { UserService } from '../user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  // styleUrls: ['./change-pwd.component.css',
  styles: [`
  :host ::ng-deep .p-password input {
    width: 20rem;
  }
`]
})
export class ChangePwdComponent implements OnInit {
  // display: boolean = false;
  userName: string = "";
  data: any;

  constructor(private routeA: ActivatedRoute, private ytSv: YtServiceService,
    private usr: UserService, private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if (!(sessionStorage.getItem("passLogin") === 'true')) {
      this.route.navigate(['']);
      return;
    }

    this.userName = sessionStorage.getItem("userName") + "";
    // (<HTMLInputElement>document.getElementById("userName")).value=this.userNameShow;
    // console.log("html  "+(<HTMLInputElement>document.getElementById("userName")).value);
    this.routeA.queryParams
      .subscribe(params => {
        this.ytSv.setTitle(params['title']);
      }
      );
    // this.mnu.logOut();
  }
  onclick(value: any): void {
    this.data = JSON.stringify(value);
    let obj: UsrpwdForm = JSON.parse(this.data);
    console.log(obj);
    let body = {
      "name": "abc",
      "username": "doh",
      "email": "6@doh.go.th",
      "password": "doh123",
      "idcard": "0000000000006"
    }
    body["password"] = obj.password;
    console.log(body);
    let url = this.ytSv.url + '/changepwd/' + sessionStorage.getItem('id');
    //'http://dbdoh.doh.go.th:9000/changepwd/' + sessionStorage.getItem('id');
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
    }
    this.http.put(url, body, header)
      .subscribe(response => {
        // console.log(response);    
        this.route.navigate(['']);
      })

  }
}