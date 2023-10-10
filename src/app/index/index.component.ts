import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
// import {Title} from "@angular/platform-browser";
import { YtServiceService } from '../yt-service.service'


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // title:string="";
  // private titleService:Title
  constructor(private route: ActivatedRoute, private ytSv: YtServiceService) { }
// token:string="";
// doc:string="";
//cntUsr="";
  ngOnInit(): void {
    // this.doc = "https://kkumail-my.sharepoint.com/:b:/p/suchat_kl/EQ5OPSG03_tKvNflOhTiFZ8B6765KK9cEWOGQCtWX-emgQ";
   // this.cntUsr=sessionStorage.getItem("cntUsr")+"";
    this.route.queryParams
      .subscribe(params => {
        // console.log(params); // { orderby: "price" }
        // this.title = params.title;
        // console.log(this.title); // price
        //this.titleService.setTitle(this.title);

        if (params['title'] == null) {
          this.ytSv.setTitle("ดาวน์โหลดเอกสารภาษีประจำปี");
        }
        else { this.ytSv.setTitle(params['title']); }
      }
      );
    // if (!sessionStorage.getItem("token")==null){
        
          // this.token= (localStorage.getItem('token') || '') ;
          // console.log(this.token);
   //  }
  }

}
