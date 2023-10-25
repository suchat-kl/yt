import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { YtServiceService } from '../yt-service.service';
// import { DropdownModule } from 'primeng/dropdown';
import { firstValueFrom } from 'rxjs';

interface MonthType {
  name: string,
  month: string
}
@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})

export class DownloadFileComponent implements OnInit {
  // disableInsert: boolean = true;
  @ViewChild('m') m!: ElementRef;
  // months: MonthType[] = [];
  // selectedMonth!: MonthType;
  // public monthName = [
  //   {
  //     name: 'มกราคม',
  //     month: '01'
  //   },
  //   {
  //     name: 'กุมภาพันธ์',
  //     month: '02'
  //   },
  //   {
  //     name: 'มีนาคม',
  //     month: '03'
  //   },
  //   {
  //     name: 'เมษายน',
  //     month: '04'
  //   },
  //   {
  //     name: 'พฤษภาคม',
  //     month: '05'
  //   },
  //   {
  //     name: 'มิถุนายน',
  //     month: '06'
  //   },
  //   {
  //     name: 'กรกฎาคม',
  //     month: '07'
  //   },
  //   {
  //     name: 'สิงหาคม',
  //     month: '08'
  //   },
  //   {
  //     name: 'กันยายน',
  //     month: '09'
  //   },
  //   {
  //     name: 'ตุลาคม',
  //     month: '10'
  //   },
  //   {
  //     name: 'พฤศจิกายน',
  //     month: '11'
  //   },
  //   {
  //     name: 'ธันวาคม',
  //     month: '12'
  //   }
  // ];
  monthName: MonthType[] = [];
  titleMonth: string = "เลือกเดือน";

  repType: string = "tax";
  period: string = "2";
  yearTax: string = "";
  monthV: string = "00";
  // selectedMonth: MonthType = { name: "มีนาคม", month: "03" };
  display: boolean = false; msg_err: string = "";
  // titleYear: string = "ปี พ.ศ. ภาษี";
  //e: any
  changeSelect(e: any) {
    // alert(e.value);
    // alert(e.target.value);

    this.monthV = e.target.value;//     this.m.nativeElement.value.trim().split(",")[1];
    // this.monthV = this.selectedMonth.month;
    // this.monthV=this.selectedMonth.month;
    // this.monthV = this.monthV.trim();
    // this.monthV=e.value;
    this.yearTax = this.yearTax.trim();
    // alert(this.selectedMonth.month);
    // alert(this.selectedMonth.name);
  }
  changeRepType(e: any) {
    this.repType = e.target.value;
    // alert(this.monthV);
    if (this.repType == "tax") {
      this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
      this.m.nativeElement.disabled;
      // this.titleYear = "ปี พ.ศ. ภาษี";
    }
    else if (this.repType == "slip")
      this.yearTax = (new Date().getFullYear() + 543).toString();
    // this.titleYear = "ปี พ.ศ.";
  }
  changeYearTax(e: any) {
    this.yearTax = e.target.value;
  }
  changePeriod(e: any) {
    this.period = e.target.value;
  }
  form = new FormGroup({

    repType: new FormControl('', Validators.required),
    // month1:new FormControl("",Validators.required),

  });

  ConvertStringToNumber(input: string) {
    if (input.trim().length == 0) {
      return NaN;
    }
    return Number(input);
  }

  get f() {

    return this.form.controls;

  }
  // onSelectedS(): void {
  //   this.monthV = this.m.nativeElement.value;
  // }

  async onclick(value: any) {//sessionStorage.getItem("id")
    let body = { "id": sessionStorage.getItem("idcard") };
    this.monthV = this.monthV.trim();
    let tmpMonth = this.monthV;
    // this.monthV=this.selectedMonth.month;
    // console.log(this.monthV);

    this.yearTax = this.yearTax.trim();
    if (this.repType == "tax") {
      this.monthV = "00";
      this.period = "2";
    }
    else {
      if (this.ConvertStringToNumber(this.yearTax) < 2567)
        this.period = "2";
      // this.monthV = this.m.nativeElement.value;
      // this.monthV = this.monthV.split(",")[1];

      if (this.ConvertStringToNumber(this.monthV) == 0) {
        alert("ต้องเลือกเดือนก่อน"); return;
      }
    }

    // if (this.monthV==null) {
    //   alert("ต้องทำการเลือกเดือนก่อน..");return;
    // }
    // alert(this.repType);
    // alert("before:"+this.monthV);
    // alert(this.yearTax);

    // this.monthV = this.m.nativeElement.value;
    // this.monthV = this.monthV.split(",")[1];
    let url = this.ytSv.url + "/repYT/" + body["id"] + "?yt=" + this.yearTax + "&mt=" + this.monthV +"&period="+this.period;
    // alert(this.monthV);
    // alert(url);
    // return;
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set( 'POST', 'DELETE')
    }
    // console.log(body);

    // alert(this.yearTax);
    // alert(this.monthV);
    // return;

    try {
      await firstValueFrom(this.http.get(url, header)).
        then(response => {
          // let j = JSON.stringify(response);
          // let obj2: LoginApi = JSON.parse(j);
          // console.log(response);
          // console.log("success");
          //downloadFile
          window.open(this.ytSv.url + "/downloadRep/" + body["id"] + "?yt=" + this.yearTax + "&mt=" + this.monthV+"&period="+this.period, "_blank");

        });






    }
    catch (err) {

      // this.display = true;
      console.log("error");
      console.log(err);

    }
    this.monthV = tmpMonth;

  }//on click
  constructor(private routeA: ActivatedRoute, private ytSv: YtServiceService,
    private route: Router, private http: HttpClient) {
    // this.months=this.monthName;
  }
  // processChange() {
  //   if (this.processType == "tax")
  //     this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
  //   else if (this.processType == "slip")
  //     this.yearTax = (new Date().getFullYear() + 543).toString();
  // }
  ngOnInit(): void {
    if (!(sessionStorage.getItem("passLogin") === 'true')) {
      this.route.navigate(['']);
      return;
    }
    this.routeA.queryParams
      .subscribe(params => {
        this.ytSv.setTitle(params['title']);
      }
      );
    this.monthName = this.ytSv.monthName;
    if (this.repType == "tax")
      this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
    else if (this.repType == "slip")
      this.yearTax = (new Date().getFullYear() + 543).toString();

    // this.monthV = '0' + (new Date().getMonth() + 1).toString().slice(-2);
    // this.repType="slip";
    // this.m.nativeElement.optionValue=this.monthV;
    // this.m.nativeElement.optionLabel = this.monthName[Number(this.monthV) - 1].name;

    // this.form.controls.month1.setValue(this.monthV);

    // this.selectedMonth= { name: "มีนาคม", month: "03" };

    // this.selectedMonth.month=    this.monthV;
    // this.selectedMonth.name = this.monthName[Number(this.monthV)-1  ].name;
    // alert(this.monthV);
    // alert(this.selectedMonth.month);
    // alert(this.selectedMonth.name);

  }

}
