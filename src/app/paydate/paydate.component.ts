//ng add ngx-bootstrap
// https://dev.to/chadwinjdeysel/create-an-crud-application-with-inline-table-editing-in-angular-14--1edl
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { YtServiceService } from '../yt-service.service';
@Component({
  selector: 'app-paydate',
  templateUrl: './paydate.component.html',
  styleUrls: ['./paydate.component.css']
})




export class PaydateComponent {
  type: string = "";
  process(type: string) {
    // let y=this.yearTax;
    switch (type) {
      case "update": this.update(); break;
      case "add": //alert(this.yearTax);
        this.add();this.find();
        break;
      case "find": //alert(this.yearTax); 
        this.find();
        break;
      default: break;
    }

    // this.yearTax = y;
  }
  async add() {
    let done: boolean;
    done = false;
    if (this.yearTax.match(/^[0-9]+$/) == null || this.yearTax.length != 4 || !Boolean(this.yearTax) || this.yearTax === "") {
      alert("ต้องบันทึกปี พ.ศ. 4 หลักเท่านั้น"); return;
    }

    let url = this.ytSv.url + "/insertEff_date" + "?yt=" + this.yearTax;

    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set( 'POST', 'DELETE')
    }


    try {
      await firstValueFrom(this.http.post(url, header)).
        then(response => {
          // let j = JSON.stringify(response);
          // let obj2: LoginApi = JSON.parse(j);
          // console.log(response);
          // console.log("success");
          //downloadFile

        });
    }
    catch (err) {

      // this.display = true;
      console.log("error");
      console.log(err);

    }
    alert("เพิ่มข้อมูลแล้ว");

  }
  find() {
    let done: boolean;
    done = false;
    if (this.yearTax.match(/^[0-9]+$/) == null || this.yearTax.length != 4 || !Boolean(this.yearTax) || this.yearTax === "") {
      alert("ต้องบันทึกปี พ.ศ. 4 หลักเท่านั้น"); return;
    }



    this.getUsers().subscribe(
      users => {
        this.users = users;
        // users.forEach(
        //   user => this.userService.getOrderForUser(user.id).subscribe(
        //     orders => this.orders.push(orders)
        //   )
        // );
      }
    );
  }
  title = 'inline-table-editor';

  // Mock Users Data
  users: User[] =
    [
      {
        pk_eff_date: {
          year: "2566",
          month: "01"
        },
        eff_date: "26012566"
      },

    ]

  userSelected: User = {} as User;
  isEditing: boolean = false

  form = this.fb.group({
    eff_date: ['', [Validators.required]],
    year: ['', [Validators.required]],
    month: ['', [Validators.required]],
    yearTax: ['', [Validators.required]]
  });
  // disableProcess: boolean =true;
  yearTax: string = "";
  changeYearTax(e: any) {
    this.yearTax = e.target.value.toString().trim();

    // this.form.reset();
  }
  constructor(
    private fb: FormBuilder, private ytSv: YtServiceService,
    private route: Router, private http: HttpClient
  ) {
    // this.yearTax = (new Date().getFullYear() + 543).toString();
  }

  selectUser(user: User) {
    if (Object.keys(this.userSelected).length === 0) {
      this.userSelected = user;
      this.isEditing = true
      if (this.yearTax === "")
        this.yearTax = (new Date().getFullYear() + 543).toString();
      this.form.patchValue({
        eff_date: user.eff_date,
        year: user.pk_eff_date.year,
        month: user.pk_eff_date.month,
        yearTax: this.yearTax
      })  //name in form
    }
  }

  deleteUser(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
    }
  }
  chkDate(d: string): any {

    let timestamp = Date.parse(d);
    if (isNaN(timestamp)) {
      // console.log("InValid date");
      return false;
    } else {
      // console.log("valid date");
      return true;
    }


  }
  async update() {
    let index = 0;
    if (!this.isEditing) { //add
      this.users[0] = {
        // id: this.generateId(),
        eff_date: this.form.value.eff_date!,
        pk_eff_date: {
          year: this.form.value.year!,
          month: this.form.value.month!
        }
        // year: this.form.value.pk_eff_date.year!,
        // month: this.form.value.month!
      }
    }
    else {

      this.form.value.eff_date != this.form.value.eff_date!.trim();
      let chkD: string = this.form.value.eff_date!;
      let done: boolean;
      done = false;
      if (chkD.match(/^[0-9]+$/) == null || chkD.length != 8 || !Boolean(chkD) || chkD === "") {

      }
      else {
        let n = Number(chkD.substring(4)) - 543;
        chkD = n.toString() + "-" + chkD.substring(2, 4) + "-" +
          chkD.substring(0, 2);
        // chkD += "T00: 00: 00.000Z";
        // alert(chkD);
        done = this.chkDate(chkD);
        // alert(new Date(chkD).toISOString());
        // done=true;
      }

      if (!done) {
        alert("ต้องบันทึกข้อมูลวันที่ 8 หลักเท่านั้น");
        return;
      }

      index = this.users.map(u => u.pk_eff_date.month).indexOf(this.userSelected.pk_eff_date.month);

      this.users[index] = {
        // id: this.userSelected.id,
        eff_date: this.form.value.eff_date!,
        pk_eff_date: {
          year: this.form.value.year!,
          month: this.form.value.month!
        }
      };
      //save
      let url = this.ytSv.url + "/updEff_date?yt=" + this.users[index].pk_eff_date.year + "&mt=" + this.users[index].pk_eff_date.month
        + "&eff_date=" + this.users[index].eff_date;
      let header = {
        headers: new HttpHeaders()
          .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
        // .set('Content-Type', 'application/json')
        // .set('Accept', 'application/json')   
        // .set('Access-Control-Allow-Origin', 'http://localhost:4200')
        // .set('Access-Control-Allow-Credentials', 'true')     
        // .set( 'POST', 'DELETE')
      }

      try {
        await firstValueFrom(this.http.put(url, header)).
          then(response => {
            // let j = JSON.stringify(response);
            // let obj2: LoginApi = JSON.parse(j);
            // console.log(response);
            // console.log("success");
            //downloadFile
            // window.open(this.ytSv.url + "/downloadRep/" + body["id"] + "?yt=" + this.yearTax + "&mt=" + this.monthV, "_blank");

          });

      }
      catch (err) {

        // this.display = true;
        console.log("error");
        console.log(err);

      }

    }
    //alert(this.users[index].eff_date + ":" + this.users[index].year + ":" + this.users[index].month);
    // let y = this.yearTax;
    // clean up
    this.userSelected = {} as User;
    this.isEditing = false
    // this.yearTax = y;
    // this.form.reset();


  }
  getUsers(): Observable<User[]> {
    let url: string = this.ytSv.url + "/selectEff_date?yt=" + this.yearTax;
    // let URL: string = "https://yourbackend";
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set( 'POST', 'DELETE')
    }
    return this.http.get<User[]>(url, header);//(`${URL}/users`)
  }
  cancel() {
    if (!this.isEditing && confirm('All unsaved changes will be removed. Are you sure you want to cancel?')) {
      this.users.splice(0, 1);
    }
    //let y=this.yearTax;
    // alert(this.yearTax);
    this.userSelected = {} as User;
    this.isEditing = false
    // this.form.reset();

    //  this.yearTax = y;

    // alert(this.yearTax);
  }

  addUser() {
    this.users.unshift({
      // id: '-',
      eff_date: '',
      pk_eff_date: {
        year: '', month: ''
      }
      // pk_eff_date.year: '',
      // pk_eff_date.month: ''
    })

    this.userSelected = this.users[0];
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  generateId() {
    // generate random 24 string
    return (Math.random() + 1).toString(36).substring(4) + (Math.random() + 1).toString(36).substring(4)
  }

  ngOnInit(): void {
    if (!(sessionStorage.getItem("passLogin") === 'true')) {
      this.route.navigate(['']);
      return;
    }
    this.yearTax = (new Date().getFullYear() + 543).toString();
    // window.location.reload();

    this.getUsers().subscribe(
      users => {
        this.users = users;
        // users.forEach(
        //   user => this.userService.getOrderForUser(user.id).subscribe(
        //     orders => this.orders.push(orders)
        //   )
        // );
      }
    );


  }

}

export interface User {
  // id: string;

  pk_eff_date: {
    year: string;
    month: string;
  }
  eff_date: string;
}

