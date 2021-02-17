import { Component, OnInit,Input } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @Input('value_app') value_app: string;
  id:any;
  sub:any;
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) { }
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  aff:any;
  ngOnInit() {
    this.aff = this.route.snapshot.queryParamMap.get("aff");
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
      if(this.value_app!=null){
        this.id = this.value_app;
      }
     // this.id =  params['id'];
      this.todoServcie.getDataPage(this.id).subscribe((response)=>{
        this.data_title = response.data.menu_name;
        
        var startDiv = response.data.menu_detail.split(response.data.menu_detail.split("src")[1].split('="')[1].split("width")[0].split('"')[0])[0];
        var endDiv = response.data.menu_detail.split(response.data.menu_detail.split("src")[1].split('="')[1].split("width")[0].split('"')[0])[1];
        var divNewSet = startDiv+response.data.menu_detail.split("src")[1].split('="')[1].split("width")[0].split('"')[0]+'&aff='+this.aff+endDiv;
        if(this.id=='contact'){
          this.data_deatail = response.data.menu_detail;
        }else{
          this.data_deatail = divNewSet;
        }
        
      });
    });
  }

}
