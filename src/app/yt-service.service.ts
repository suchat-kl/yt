import { Injectable } from '@angular/core';
import { Title } from "@angular/platform-browser";
//import { ActivatedRoute,RouterModule, Routes } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class YtServiceService {
  // private route: ActivatedRoute,
  constructor(private titleService: Title) { }
  // title:string="";
  private _url = 'https://dbdoh.doh.go.th:9000'; //develop dbdoh production backupdoh
  public get url() {
    return this._url;
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
    this.titleService.setTitle(title);
  }

}
