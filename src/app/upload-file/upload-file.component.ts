
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
// import { encode } from 'querystring';

import { concat, lastValueFrom } from 'rxjs';


import { YtServiceService } from '../yt-service.service';
interface MonthType {
  name: string,
  month: string
}
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  @ViewChild('m') m!: ElementRef;
  changeYearTax(e: any) {
    this.yearTax = e.target.value.toString().trim();
  }
  changeSelect(e: any) {

    // alert(e.target.value);
    this.monthV = this.m.nativeElement.value.trim().split(",")[1];
    // this.monthV = this.selectedMonth.month;

    this.monthV = this.monthV.trim();
    this.yearTax = this.yearTax.trim();
    // alert(this.monthV);
  }
  changeRepType(e: any) {
    this.process = e.target.value;
    // alert(this.monthV);
    if (this.process != "slip") {
      this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
      this.m.nativeElement.disabled
      // this.titleYear = "ปี พ.ศ. ภาษี";
    }
    else
      this.yearTax = (new Date().getFullYear() + 543).toString();
    // this.titleYear = "ปี พ.ศ.";
  }
  monthV: string = "";
  monthName: MonthType[] = [];
  process: string = "retired"; //present
  disableInsert: boolean = true;
  disableDelete: boolean = true;
  //disableUpdate: boolean = true;
  // sizeMax = false;
  // isTxt = false;
  sizeMaxFile = 5;
  display: boolean = false; msg_err: string = "";
  jsonOutputSlip: {
    year: string; month: string; id_card: string; title: string;
    fname: string; lname: string; //doh, position 6 doh not use
    divname: string; bankcode: string; bankname: string; brchcode: string;
    brchname: string; bank_acc: string;
    c14: string; c15: string; c16: string; c17: string;
    c18: string; c19: string; c20: string; c21: string;
    c22: string; c23: string; c24: string; c25: string;
    c27: string; c28: string; c29: string; c30: string;
    c31: string; c32: string; c33: string; c34: string;
    c35: string; c36: string; c37: string; c38: string;
    c39: string; c40: string; c41: string; c42: string;
    c43: string; c44: string; c45: string; c46: string;
    c47: string; c48: string; c49: string; c50: string;
    c51: string; c52: string; c53: string; c54: string;
    c55: string; c56: string; c57: string; c58: string;
    c59: string; c60: string; c61: string; c62: string;
    c63: string; c64: string; c65: string; c66: string;
    c67: string; c68: string; c69: string; c70: string;
    c71: string; c72: string; c73: string; c74: string;
    c75: string; c76: string; c77: string; c78: string;
    c79: string; sahaDeps: string; sahaTotl: string; loanOth: string;
    club: string; posno: string; eff_date: string; insr: string;
    divcode: string;period:string

  } = {
      year: "", month: "", id_card: "", title: "",
      fname: "", lname: "", //doh, position 6 doh not use
      divname: "", bankcode: "", bankname: "", brchcode: "",
      brchname: "", bank_acc: "",
      c14: "", c15: "", c16: "", c17: "",
      c18: "", c19: "", c20: "", c21: "",
      c22: "", c23: "", c24: "", c25: "",
      c27: "", c28: "", c29: "", c30: "",
      c31: "", c32: "", c33: "", c34: "",
      c35: "", c36: "", c37: "", c38: "",
      c39: "", c40: "", c41: "", c42: "",
      c43: "", c44: "", c45: "", c46: "",
      c47: "", c48: "", c49: "", c50: "",
      c51: "", c52: "", c53: "", c54: "",
      c55: "", c56: "", c57: "", c58: "",
      c59: "", c60: "", c61: "", c62: "",
      c63: "", c64: "", c65: "", c66: "",
      c67: "", c68: "", c69: "", c70: "",
      c71: "", c72: "", c73: "", c74: "",
      c75: "", c76: "", c77: "", c78: "",
      c79: "", sahaDeps: "", sahaTotl: "", loanOth: "",
      club: "", posno: "", eff_date: "", insr: "",
      divcode: "",period:""

    };
  jsonOutputSlipArr: {
    year: string; month: string; id_card: string; title: string;
    fname: string; lname: string; //doh, position 6 doh not use
    divname: string; bankcode: string; bankname: string; brchcode: string;
    brchname: string; bank_acc: string;
    c14: string; c15: string; c16: string; c17: string;
    c18: string; c19: string; c20: string; c21: string;
    c22: string; c23: string; c24: string; c25: string;
    c26: string;
    c27: string; c28: string; c29: string; c30: string;
    c31: string; c32: string; c33: string; c34: string;
    c35: string; c36: string; c37: string; c38: string;
    c39: string; c40: string; c41: string; c42: string;
    c43: string; c44: string; c45: string; c46: string;
    c47: string; c48: string; c49: string; c50: string;
    c51: string; c52: string; c53: string; c54: string;
    c55: string; c56: string; c57: string; c58: string;
    c59: string; c60: string; c61: string; c62: string;
    c63: string; c64: string; c65: string; c66: string;
    c67: string; c68: string; c69: string; c70: string;
    c71: string; c72: string; c73: string; c74: string;
    c75: string; c76: string; c77: string; c78: string;
    c79: string; sahaDeps: string; sahaTotl: string; loanOth: string;
    club: string; posno: string; eff_date: string; insr: string;
    divcode: string;period:string;
  }[] = [];

  jsonOutput: {
    thb: string;
    xx: string; a: string; b: string; c: string; d: string;
    e: string; f: string; g: string; h: string; i: string; j: string; k: string; l: string;
    m: string; n: string; o: string; p: string; q: string; r: string; s: string; t: string;
  } = {
      thb: "",
      "xx": "", "a": "", "b": "", "c": "", "d": "", "e": "", "f": "", "g": "",
      "h": "", "i": "", "j": "", "k": "",
      "l": "", "m": "", "n": "",
      "o": "", "p": "", "q": "", "r": "", "s": "", "t": ""
    };

  jsonOutputArr: {
    thb: string;
    xx: string; a: string; b: string; c: string; d: string;
    e: string; f: string; g: string; h: string; i: string; j: string; k: string; l: string;
    m: string; n: string; o: string; p: string; q: string; r: string; s: string; t: string;
  }[] = [];
  //   form: FormGroup = new FormGroup({
  //     title: new FormControl(''),
  //     description: new FormControl('')
  // })
  constructor(private routeA: ActivatedRoute, private ytSv: YtServiceService,
    private route: Router, private http: HttpClient
  ) { }
  base64: any; //dateNum: String = "";
  fileName: string = ""; yearTax: string = ""; fileSize: string = "";
  //fileGloblal: File | undefined;
  // maxSize=5*1024*1024;


  onChange = (event: Event) => {
    //let FS = require('fs');
    let dStr = ""; let delimiter = "";
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.display = false;
    //  this.fileGloblal = file;
    this.fileName = file.name;
    this.disableInsert = true;
    this.disableDelete = true;


    //console.log(file.type.toString());
    if (!(file.type.toString() == "text/plain")) {
      // alert("ต้องเลือกไฟล์ข้อความเท่านั้น");
      this.display = true; this.msg_err = "ต้องเลือกไฟล์ข้อความเท่านั้น";
      return;
    }
    let fname: string = "";
    this.sizeMaxFile = 5;
    if (this.process == "present") {
      fname = "tax".concat(this.yearTax).concat(".txt");
      delimiter = "$";
    }
    else if (this.process == "retired") {
      fname = "retired".concat(this.yearTax).concat(".txt");
      delimiter = "|";
    }
    else if (this.process == "slip") {
      fname = "slip".concat(this.yearTax).concat(this.monthV).concat(".txt");
      delimiter = "$";
      this.sizeMaxFile = 10;
    }


    if (!(file.name == fname)) {
      //alert("ต้องใช้ชื่อไฟล์:  " + fname);
      this.display = true; this.msg_err = "ต้องใช้ชื่อไฟล์:  " + fname;
      return;
    }

    // console.log(file.name);
    // console.log(this.fileName.substr(-3).toLowerCase());
    // this.isTxt = true;
    // if (!(this.fileName.substr(-3).toLowerCase() === "txt")) {
    let l = this.fileName.length;
    if (!(this.fileName.substring(l - 3).toLowerCase() === "txt")) {
      //  this.isTxt = false;
      // alert("ต้องเลือกไฟล์ข้อความเท่านั้นนามสกุล txt");
      this.display = true; this.msg_err = "ต้องเลือกไฟล์ข้อความเท่านั้นนามสกุล txt";
      return;
    }
    let fs = file.size / 1024 / 1024;
    // this.sizeMax = false;
    if (fs > this.sizeMaxFile) {
      //this.form.validator.
      //this.sizeMax = true;
      // alert("ขนาดเกิน 5 MB");
      this.display = true;
      this.process == "slip" ?
        this.msg_err = "ขนาดเกิน 10 MB"
        :
        this.msg_err = "ขนาดเกิน 5 MB";
      return;
    }
    let s = (fs).toFixed(2).toString().concat(" MB");
    this.fileSize = "ขนาด " + s;
    let reader = new FileReader();
    // reader.readAsDataURL(file);

    reader.readAsText(file, "TIS-620");
    // let text = FS.readFileSync(file, 'utf-8');
    // let textByLine = text.split('\n')

    reader.onload = () => {
      //reader.readAsText(file);
      this.base64 = reader.result;
      let data: any;
      let run = 0;
      sessionStorage.removeItem("dStr");
      for (const line of this.base64.split(/[\r\n]+/)) {
        data = line.split(delimiter);

        if (this.process == "present") {
          if (data[10] == null || typeof data[10] === 'undefined') { //yearTax
            continue;
          }
          if (data[16] == null || typeof data[16] === 'undefined' || data[16] == "" || ((data[16] != "1") && (data[16] != "2"))) { //กบข กสจ or Not
            data[16] = "0";
          }
          if (sessionStorage.getItem("dStr") == null) {
            // this.dateNum = data[19];
            sessionStorage.setItem("dStr", data[19]);
            dStr = this.updateDateStr();
            // alert("one");
            //console.log(data[19]);
          }
          // console.log(data); .push
          this.jsonOutputArr.push({
            "thb": "",
            "xx": data[5], "a": data[0], "b": data[1], "c": data[2],
            "d": data[3], "e": data[4], "f": data[6], "g": data[7], "h": data[8],
            "i": data[9], "j": data[10], "k": data[11], "l": data[12], "m": data[13],
            "n": data[14], "o": data[15], "p": data[16], "q": data[17], "r": data[18],
            "s": dStr, "t": ""
          });
        }
        else if (this.process == "retired") {
          run++;
          if (data[13] == null) {
            data[13] = this.yearTax;
          }
          if (data[4] == null) {
            // data[4] = run.toString();
            continue;
          }
          if (sessionStorage.getItem("dStr") == null) {
            // this.dateNum = data[19];
            sessionStorage.setItem("dStr", data[15]);
            dStr = this.updateDateStr();
            // alert("one");
            //console.log(data[19]);
          }
          this.jsonOutputArr.push({
            "thb": "",
            "a": data[0], "b": data[1], "c": data[2],
            "d": data[3], "e": data[4], "f": data[5], "g": data[6], "h": data[7],
            "i": data[8], "j": data[9], "k": data[10], "l": data[11], "m": data[12],
            "n": data[13], "o": data[14], "p": dStr, "q": data[16], "r": data[17],
            "s": data[18], "t": data[19], "xx": run.toString()
          });
        }
        else if (this.process == "slip") {
          // period
          /*
           if (sessionStorage.getItem("dStr") == null) {
             // this.dateNum = data[19];
             sessionStorage.setItem("dStr", data[78]);
             dStr = this.updateDateStr();
             // alert("one");
             //console.log(data[19]);
           }
           */
          // let s = data[78];
          // let dStr = s.substring(0, 2) + " /  " + s.substring(2, 2) + "  / " + s.substring(4);
          this.jsonOutputSlipArr.push({
            "year": data[0], "month": data[1], "id_card": data[2],
            "title": data[3], "fname": data[4], "lname": data[5], "divname": data[7],
            "bankcode": data[8],
            "bankname": data[9], "brchcode": data[10], "brchname": data[11], "bank_acc": data[12],

            "c14": (parseFloat(data[13]) / 100).toString(),
            "c15": (parseFloat(data[14]) / 100).toString(),
            "c16": (parseFloat(data[15]) / 100).toString(),
            "c17": (parseFloat(data[16]) / 100).toString(),
            "c18": (parseFloat(data[17]) / 100).toString(),
            "c19": (parseFloat(data[18]) / 100).toString(),
            "c20": (parseFloat(data[19]) / 100).toString(),
            "c21": (parseFloat(data[20]) / 100).toString(),
            "c22": (parseFloat(data[21]) / 100).toString(),
            "c23": (parseFloat(data[22]) / 100).toString(),
            "c24": (parseFloat(data[23]) / 100).toString(),
            "c25": (parseFloat(data[24]) / 100).toString(),
            "c26": (parseFloat(data[25]) / 100).toString(),
            "c27": (parseFloat(data[26]) / 100).toString(),
            "c28": (parseFloat(data[27]) / 100).toString(),
            "c29": (parseFloat(data[28]) / 100).toString(),
            "c30": (parseFloat(data[29]) / 100).toString(),
            "c31": (parseFloat(data[30]) / 100).toString(),
            "c32": (parseFloat(data[31]) / 100).toString(),
            "c33": (parseFloat(data[32]) / 100).toString(),

            "c34": data[33],
            "c35": (parseFloat(data[34]) / 100).toString(),
            "c36": data[35],
            "c37": (parseFloat(data[36]) / 100).toString(),
            "c38": data[37],
            "c39": (parseFloat(data[38]) / 100).toString(),
            "c40": data[39],
            "c41": (parseFloat(data[40]) / 100).toString(),
            "c42": (parseFloat(data[41]) / 100).toString(),
            "c43": (parseFloat(data[42]) / 100).toString(),
            "c44": (parseFloat(data[43]) / 100).toString(),
            "c45": (parseFloat(data[44]) / 100).toString(),
            "c46": (parseFloat(data[45]) / 100).toString(),
            "c47": (parseFloat(data[46]) / 100).toString(),
            "c48": (parseFloat(data[47]) / 100).toString(),
            "c49": (parseFloat(data[48]) / 100).toString(),
            "c50": (parseFloat(data[49]) / 100).toString(),
            "c51": (parseFloat(data[50]) / 100).toString(),
            "c52": (parseFloat(data[51]) / 100).toString(),
            "c53": (parseFloat(data[52]) / 100).toString(),
            "c54": (parseFloat(data[53]) / 100).toString(),
            "c55": (parseFloat(data[54]) / 100).toString(),
            "c56": (parseFloat(data[55]) / 100).toString(),
            "c57": (parseFloat(data[56]) / 100).toString(),
            "c58": (parseFloat(data[57]) / 100).toString(),
            "c59": (parseFloat(data[58]) / 100).toString(),

            "c60": data[59],
            "c61": (parseFloat(data[60]) / 100).toString(),
            "c62": data[61],
            "c63": (parseFloat(data[62]) / 100).toString(),
            "c64": data[63],
            "c65": (parseFloat(data[64]) / 100).toString(),
            "c66": data[65],
            "c67": (parseFloat(data[66]) / 100).toString(),
            "c68": data[67],
            "c69": (parseFloat(data[68]) / 100).toString(),
            "c70": data[69],
            "c71": (parseFloat(data[70]) / 100).toString(),
            "c72": data[71],
            "c73": (parseFloat(data[72]) / 100).toString(),
            "c74": data[73],
            "c75": (parseFloat(data[74]) / 100).toString(),
            "c76": (parseFloat(data[75]) / 100).toString(),
            "c77": (parseFloat(data[76]) / 100).toString(),
            "c78": (parseFloat(data[77]) / 100).toString(),
            "c79": data[78],

            "sahaDeps": "", "sahaTotl": "", "loanOth": "",
            "club": "", "posno": "", "eff_date": "", "insr": "",
            "divcode": "","period":"2"
          });




        }



        // break;
        // console.log(data[6]);
        // console.log(JSON.stringify(data));
      } // for text file read
      // console.log((this.jsonOutput));
      this.disableDelete = false;
    };
    //console.log(this.dateNum);
    //this.updateDateStr();
    if (this.process == "present" ||
      this.process == "retired"
    ) {
      sessionStorage.removeItem("dStr");
    }
  };  //on change file
  updateDateStr() {
    let monthStr =
      [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฏาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พศจิกายน",
        "ธันวาคม"
      ];

    // let i:number=0;
    // i=Number(this.dateNum.substring(2,4));
    let s = sessionStorage.getItem("dStr") + "";

    let key: any = Number(s.substring(2, 4));
    // if (key===6){
    //   alert(key);
    // }
    // console.log(s);
    // console.log(key);
    //console.log(this.jsonOutputArr[0]["s"]);
    let x = monthStr[key - 1]

    // console.log(x);



    //monthStr[6][this.dateNum.substring(2,4)]
    //console.log(key);
    let dStr = s.substring(0, 2) + " /  " + x + "  / " + s.substring(4);

    return dStr;


  }
  async retired(value: any) {
    // alert("retired");
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      // .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


    }
    if (!this.disableDelete) {
      let url = this.ytSv.url + "/delYTretired/" + this.yearTax;//+"?file="+this.fileGloblal;
      // console.log(body);
      try {
        await lastValueFrom(this.http.delete(url, header)).
          then(response => {

            this.display = true; this.msg_err = "ลบข้อมูลเสร็จแล้ว....";
            this.disableDelete = true;
            this.disableInsert = false;

          });

      }
      catch (err) {

        // this.display = true;
        console.log("error");
        console.log(err);

      }

      return;
    } //delete



    if (!this.disableInsert) {
      // console.log(body);
      let url = this.ytSv.url + "/insertTxtRetired";


      for (let i = 0; i < this.jsonOutputArr.length; i++) {
        this.jsonOutput = this.jsonOutputArr[i];
        let body = this.jsonOutput;
        try {//,header
          await lastValueFrom(this.http.post(url, body)).
            then(response => {


              this.disableInsert = true;
              this.disableDelete = true;

            });

        }
        catch (err) {

          // this.display = true;
          console.log("error");
          console.log(err);

        }


      }//for


      this.disableInsert = true;
      this.disableDelete = true;
      this.display = true; this.msg_err = "เพิ่มข้อมูลจากไฟล์ข้อความเสร็จแล้ว....";
      return;
    }//insert



  }//retired

  //slip

  async slip(value: any) {
    // alert("retired");
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      // .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


    }
    if (!this.disableDelete) {
      let url = this.ytSv.url + "/delYTslip/" + this.yearTax + "/" + this.monthV;//+"?file="+this.fileGloblal;
      // console.log(body);
      try {
        await lastValueFrom(this.http.delete(url, header)).
          then(response => {

            this.display = false; 
            this.msg_err = "ลบข้อมูลเสร็จแล้ว....";
            this.disableDelete = true;
            this.disableInsert = false;
            alert(this.msg_err);

          });

      }
      catch (err) {

        // this.display = true;
        console.log("error");
        console.log(err);

      }

      return;
    } //delete



    if (!this.disableInsert) {
      // console.log(body);


      // await lastValueFrom(this.http.get("/createPosno")).
      //   then(response => {
      //   });
      let url = this.ytSv.url + "/insertTxtSlip";


      for (let i = 0; i < this.jsonOutputSlipArr.length; i++) {
        this.jsonOutputSlip = this.jsonOutputSlipArr[i];
        let body = this.jsonOutputSlip;
        try {//,header
          await lastValueFrom(this.http.post(url, body)).
            then(response => {


              this.disableInsert = true;
              this.disableDelete = true;

            });

        }
        catch (err) {

          // this.display = true;
          console.log("error");
          console.log(err);

        }


      }//for


      this.disableInsert = true;
      this.disableDelete = true;
      this.display = false; 
      this.msg_err = "เพิ่มข้อมูลจากไฟล์ข้อความเสร็จแล้ว....";
      alert(this.msg_err);
      return;
    }//insert



  }
  //slip
  async onclick(value: any) {
    if (this.process == "retired") {
      this.retired(value);
      // console.log(this.process);
      return;
    }
    else if (this.process == "slip") {
      this.slip(value);
      // console.log(this.process);
      return;
    }




    // let data = JSON.stringify(value);
    // console.log(data);
    // "fileName": this.yearTax,
    // "base64": this.base64,
    // "yeartax": this.yearTax,
    let header = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + sessionStorage.getItem("token"))
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')   
      // .set('Access-Control-Allow-Origin', '*')
      // .set('Access-Control-Allow-Credentials', 'true')     
      // .set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
      // .set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")


    }
    if (!this.disableDelete) {
      let url = this.ytSv.url + "/delYT/" + this.yearTax;//+"?file="+this.fileGloblal;



      // console.log(body);



      try {
        await lastValueFrom(this.http.delete(url, header)).
          then(response => {
            // let j = JSON.stringify(response);
            // let obj2: LoginApi = JSON.parse(j);
            // console.log(response);
            // console.log("success");
            this.display = true; this.msg_err = "ลบข้อมูลเสร็จแล้ว....";
            this.disableDelete = true;
            this.disableInsert = false;

          });

      }
      catch (err) {

        // this.display = true;
        console.log("error");
        console.log(err);

      }

      return;
    } //delete



    if (!this.disableInsert) {
      // console.log(body);
      let url = this.ytSv.url + "/insertTxt";

      for (let i = 0; i < this.jsonOutputArr.length; i++) {
        this.jsonOutput = this.jsonOutputArr[i];
        let body = this.jsonOutput;
        try {//,header
          await lastValueFrom(this.http.post(url, body)).
            then(response => {
              // let j = JSON.stringify(response);
              // let obj2: LoginApi = JSON.parse(j);
              // console.log(response);
              // console.log("success");
              //this.route.navigate(['']);
              // this.disableUpdate = false;

              this.disableInsert = true;
              this.disableDelete = true;

            });

        }
        catch (err) {

          // this.display = true;
          console.log("error");
          console.log(err);

        }


      }//for
      this.disableInsert = true;
      this.disableDelete = true;
      this.display = true; this.msg_err = "เพิ่มข้อมูลจากไฟล์ข้อความเสร็จแล้ว....";
      return;
    }//insert
    // document.getElementById("file-id").files[0].name; 
    // let obj: UsrpwdForm = JSON.parse(this.data);
    //{"filetxt":"C:\\fakepath\\หนังสือรับรองภาษี 2563_New.txt"}
    // if (!this.disableUpdate) {
    //   this.updateDateStr();
    //   this.display = true; this.msg_err = "ปรับปรุงข้อมูลจากไฟล์ข้อความเสร็จแล้ว....";
    //   this.disableUpdate = true;
    // }

  } // onclick


  ngOnInit(): void {
    if (!(sessionStorage.getItem("passLogin") === 'true')) {
      this.route.navigate(['']);
      return;
    }
    // this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
    this.monthName = this.ytSv.monthName;
    if (this.process != "slip")
      this.yearTax = (new Date().getFullYear() + 543 - 1).toString();
    else
      this.yearTax = (new Date().getFullYear() + 543).toString();

    this.monthV = '0' + (new Date().getMonth() + 1).toString().slice(-2);

    this.routeA.queryParams
      .subscribe(params => {
        this.ytSv.setTitle(params['title']);
      }
      );
  }

}
