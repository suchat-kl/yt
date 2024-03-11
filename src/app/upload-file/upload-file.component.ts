
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
  changePeriod(e: any) {
    this.period = e.target.value.toString().trim();
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
    else {
      this.yearTax = (new Date().getFullYear() + 543).toString();
    // this.titleYear = "ปี พ.ศ.";
    }
  }
  monthV: string = "";
  monthName: MonthType[] = [];
  process: string = "retired"; //present
  disableInsert: boolean = true;
  disableDelete: boolean = true;
  period:string="2";//will be edit
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
    club: string; posno: string;  insr: string;
    divcode: string;period:string;
    a1N: string; a1V: string; a2N: string; a2V: string; a3N: string; a3V: string;
    a4N: string; a4V: string; a5N: string; a5V: string; a6N: string; a6V: string;
    a7N: string; a7V: string; a8N: string; a8V: string; a9N: string; a9V: string;
    a10N: string; a10V: string; a11N: string; a11V: string; a12N: string; a12V: string;
    a13N: string; a13V: string; a14N: string; a14V: string; a15N: string; a15V: string;
    
    r1N: string; r1V: string; r2N: string; r2V: string; r3N: string; r3V: string;
    r4N: string; r4V: string; r5N: string; r5V: string; r6N: string; r6V: string;
    r7N: string; r7V: string; r8N: string; r8V: string; r9N: string; r9V: string;
    r10N: string; r10V: string; r11N: string; r11V: string; r12N: string; r12V: string;
    r13N: string; r13V: string; r14N: string; r14V: string; r15N: string; r15V: string;
    r16N: string; r16V: string; r17N: string; r17V: string; r18N: string; r18V: string;
    r19N: string; r19V: string; r20N: string; r20V: string;
c162:string;c163:string;gpfp1:string;gpfp1add:string;netp1:string;
    gpfp2: string; gpfp2add: string; netp2: string;subdiv:string;
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
      club: "", posno: "",  insr: "",
      divcode: "",period:"",
      a1N:"",a1V:"",
      a2N: "", a2V: "",
      a3N: "", a3V: "",
      a4N: "", a4V: "",
      a5N: "", a5V: "",
      a6N: "", a6V: "",
      a7N: "", a7V: "",
      a8N: "", a8V: "",
      a9N: "", a9V: "",
      a10N: "", a10V: "",
      a11N: "", a11V: "",
      a12N: "", a12V: "",
      a13N: "", a13V: "",
      a14N: "", a14V: "",
      a15N: "", a15V: "",
      r1N: "", r1V: "",
      r2N: "", r2V: "",
      r3N: "", r3V: "",
      r4N: "", r4V: "",
      r5N: "", r5V: "",
      r6N: "", r6V: "",
      r7N: "", r7V: "",
      r8N: "", r8V: "",
      r9N: "", r9V: "",
      r10N: "", r10V: "",
      r11N: "", r11V: "",
      r12N: "", r12V: "",
      r13N: "", r13V: "",
      r14N: "", r14V: "",
      r15N: "", r15V: "",
      r16N: "", r16V: "",
      r17N: "", r17V: "",
      r18N: "", r18V: "",
      r19N: "", r19V: "",
      r20N: "", r20V: "",
      c162:"",c163:"",
      gpfp1: "", gpfp1add: "", netp1: "",
      gpfp2: "", gpfp2add: "", netp2: "",
subdiv:"",
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
    club: string; posno: string;  insr: string;
    divcode: string;period:string;

    a1N: string; a1V: string; a2N: string; a2V: string; a3N: string; a3V: string;
    a4N: string; a4V: string; a5N: string; a5V: string; a6N: string; a6V: string;
    a7N: string; a7V: string; a8N: string; a8V: string; a9N: string; a9V: string;
    a10N: string; a10V: string; a11N: string; a11V: string; a12N: string; a12V: string;
    a13N: string; a13V: string; a14N: string; a14V: string; a15N: string; a15V: string;

    r1N: string; r1V: string; r2N: string; r2V: string; r3N: string; r3V: string;
    r4N: string; r4V: string; r5N: string; r5V: string; r6N: string; r6V: string;
    r7N: string; r7V: string; r8N: string; r8V: string; r9N: string; r9V: string;
    r10N: string; r10V: string; r11N: string; r11V: string; r12N: string; r12V: string;
    r13N: string; r13V: string; r14N: string; r14V: string; r15N: string; r15V: string;
    r16N: string; r16V: string; r17N: string; r17V: string; r18N: string; r18V: string;
    r19N: string; r19V: string; r20N: string; r20V: string;
c162:string;c163:string;
    gpfp1: string; gpfp1add: string; netp1: string;
    gpfp2: string; gpfp2add: string; netp2: string;
    subdiv:string;
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
      delimiter = "$";//"$"
    }
    else if (this.process == "retired") {
      fname = "retired".concat(this.yearTax).concat(".txt");
      delimiter = "|";
    }
    else if (this.process == "slip") {
      fname = "slip".concat(this.yearTax).concat(this.monthV).concat(".txt");
      delimiter = "$";
      this.sizeMaxFile = 15;
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
        this.msg_err = "ขนาดเกิน 15 MB"
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

/*
old format
 this.jsonOutputArr.push({
            "thb": "",
            "xx": data[5], "a": data[0], "b": data[1], "c": data[2],
            "d": data[3], "e": data[4], "f": data[6], "g": data[7], "h": data[8],
            "i": data[9], "j": data[10], "k": data[11], "l": data[12], "m": data[13],
            "n": data[14], "o": data[15], "p": data[16], "q": data[17], "r": data[18],
            "s": dStr, "t": ""
          });

*/
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
            "bankcode": data[15],
            "bankname": data[16], "brchcode": data[17], "brchname": data[18], "bank_acc": data[19],

            "c14": (parseFloat(data[20]) / 100).toString(),
            "c15": (parseFloat(data[21]) / 100).toString(),
            "c16": (parseFloat(data[25]) / 100).toString(),
            "c17": (parseFloat(data[26]) / 100).toString(),
            
            "c18": "0",
            "c19": "0",
            "c20": "0",
            "c21": "0",
            "c22": "0",
            "c23": "0",
            "c24": "0",
            "c25": "0",
            "c26": "0",
            "c27": "0",
            "c28": "0",
            "c29": "0",
            "c30": "0",
            "c31": "0",
            "c32": "0",
            "c33": "0",

            "c34": "",
            "c35": "0",
            "c36": "",
            "c37": "0",
            "c38": "",
            "c39": "0",
            "c40": "",
            "c41": "0",
            "c42": (parseFloat(data[87]) / 100).toString(),
            "c43": (parseFloat(data[88]) / 100).toString(),

            "c44": ((parseFloat(data[89]) + parseFloat(data[90])  )    / 100).toString(),
            
            "c45": "0",
            "c46": "0",
            "c47": (parseFloat(data[162]) / 100).toString(),
            "c48": ((parseFloat(data[91]) + parseFloat(data[92])) / 100).toString(),
            "c49": ((parseFloat(data[93]) + parseFloat(data[94])) / 100).toString(),
            
            "c50": "0",
            "c51": "0",
            "c52": "0",
            "c53": "0",
            "c54": "0",
            "c55": "0",
            "c56": "0",
            "c57": "0",
            "c58": "0",
            "c59": "0",

            "c60": "",
            "c61": "0",
            "c62": "",
            "c63": "0",
            "c64": "",
            "c65": "0",
            "c66": "",
            "c67": "0",

            "c68": "",
            "c69": "0",
            "c70": "",
            "c71": "0",
            "c72": "",
            "c73": "0",
            "c74": "",
            "c75": "0",
            
            "c76": (parseFloat(data[159]) / 100).toString(),
            "c77": (parseFloat(data[160]) / 100).toString(),
            "c78": (parseFloat(data[163]) / 100).toString(),
            "c79": data[170],
            "c162":data[161],
            "c163":data[162],
            "gpfp1": (parseFloat(data[164]) / 100).toString(),
            "gpfp1add": (parseFloat(data[165]) / 100).toString() , 
            "netp1": (parseFloat(data[166]) / 100).toString() ,
            "gpfp2": (parseFloat(data[167]) / 100).toString(),
            "gpfp2add": (parseFloat(data[168]) / 100).toString() ,
            "netp2": (parseFloat(data[169]) / 100).toString(),

            "sahaDeps": "", "sahaTotl": "", "loanOth": "",
            "club": "", "posno": data[12], "insr": "",
            "divcode": "", "period": "2",
            "a1N": data[28],
            "a1V": ((parseFloat(data[29]) + parseFloat(data[30])) / 100).toString(),
            "a2N": data[32],
            "a2V": ((parseFloat(data[33]) + parseFloat(data[34])) / 100).toString(),
            "a3N": data[36],
            "a3V": ((parseFloat(data[37]) + parseFloat(data[38])) / 100).toString(),
            "a4N": data[40],
            "a4V": ((parseFloat(data[41]) + parseFloat(data[42])) / 100).toString(),
            "a5N": data[44],
            "a5V": ((parseFloat(data[45]) + parseFloat(data[46])) / 100).toString(),
            "a6N": data[48],
            "a6V": ((parseFloat(data[49]) + parseFloat(data[50])) / 100).toString(),
            "a7N": data[52],
            "a7V": ((parseFloat(data[53]) + parseFloat(data[54])) / 100).toString(),
            "a8N": data[56],
            "a8V": ((parseFloat(data[57]) + parseFloat(data[58])) / 100).toString(),
            "a9N": data[60],
            "a9V": ((parseFloat(data[61]) + parseFloat(data[62])) / 100).toString(),
            "a10N": data[64],
            "a10V": ((parseFloat(data[65]) + parseFloat(data[66])) / 100).toString(),
            "a11N": data[68],
            "a11V": ((parseFloat(data[69]) + parseFloat(data[70])) / 100).toString(),
            "a12N": data[72],
            "a12V": ((parseFloat(data[73]) + parseFloat(data[74])) / 100).toString(),
            "a13N": data[76],
            "a13V": ((parseFloat(data[77]) + parseFloat(data[78])) / 100).toString(),
            "a14N": data[80],
            "a14V": ((parseFloat(data[81]) + parseFloat(data[82])) / 100).toString(),
            "a15N": data[84],
            "a15V": ((parseFloat(data[85]) + parseFloat(data[86])) / 100).toString(),
            "r1N": data[100],
            "r1V": (parseFloat(data[101])  / 100).toString(),
            "r2N": data[103],
            "r2V": (parseFloat(data[104]) / 100).toString(),
            "r3N": data[106],
            "r3V": (parseFloat(data[107]) / 100).toString(),
            "r4N": data[109],
            "r4V": (parseFloat(data[110]) / 100).toString(),
            "r5N": data[112],
            "r5V": (parseFloat(data[113]) / 100).toString(),
            "r6N": data[115],
            "r6V": (parseFloat(data[116]) / 100).toString(),
            "r7N": data[118],
            "r7V": (parseFloat(data[119]) / 100).toString(),
            "r8N": data[121],
            "r8V": (parseFloat(data[122]) / 100).toString(),
            "r9N": data[124],
            "r9V": (parseFloat(data[125]) / 100).toString(),
            "r10N": data[127],
            "r10V": (parseFloat(data[128]) / 100).toString(),
            "r11N": data[130],
            "r11V": (parseFloat(data[131]) / 100).toString(),
            "r12N": data[133],
            "r12V": (parseFloat(data[134]) / 100).toString(),
            "r13N": data[136],
            "r13V": (parseFloat(data[137]) / 100).toString(),
            "r14N": data[139],
            "r14V": (parseFloat(data[140]) / 100).toString(),
            "r15N": data[142],
            "r15V": (parseFloat(data[143]) / 100).toString(),
            "r16N": data[145],
            "r16V": (parseFloat(data[146]) / 100).toString(),
            "r17N": data[148],
            "r17V": (parseFloat(data[149]) / 100).toString(),
            "r18N":  data[151],
            "r18V": (parseFloat(data[152]) / 100).toString(),
            "r19N": data[154],
            "r19V": (parseFloat(data[155]) / 100).toString(),
            "r20N": data[157],
            "r20V": (parseFloat(data[158]) / 100).toString(),
            "subdiv":data[9],
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
      let url = this.ytSv.url + "/delYTslip/" + this.yearTax + "/" + this.monthV+"/"+this.period;//+"?file="+this.fileGloblal;
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
      // alert("loop insTxt");
      // console.log(body);
      let url = this.ytSv.url + "/insertTxt";
      // alert("len="+this.jsonOutputArr.length);
      for (let i = 0; i < this.jsonOutputArr.length; i++) {
        this.jsonOutput = this.jsonOutputArr[i];
        // alert(this.jsonOutput);
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
