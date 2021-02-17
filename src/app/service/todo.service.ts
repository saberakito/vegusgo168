import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
interface registerData{
  success:boolean,
  message:string,
  data:string,
  register_text_detail:string,
  type:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:Http, private http2: HttpClient) { }

private local = window.location.origin;
//private local = "http://localhost:80";
//private local = "http://betufa55.com";

  getTodoList(data){
    if(data==1){
      return this.http.get(this.local+"/api/getNews.php?type=1&ac=all").pipe(map((res)=>res.json()));
    }else{
      return this.http.get(this.local+"/api/getNews.php?type=1").pipe(map((res)=>res.json()));
    }
  }
  getDetailNews(id){
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getDetailNew&id="+id).pipe(map((res)=>res.json()));
  }

  getTextRegister(){
    //return this.http.get("http://conner888.com/api/dataAdjust.php?ac=getRegisterText").pipe(map((res)=>res.json()));
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getRegisterText").pipe(map((res)=>res.json()));
  }

  getTextContext(){
    //return this.http.get("http://conner888.com/api/dataAdjust.php?ac=getContactText").pipe(map((res)=>res.json()));
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getContactText").pipe(map((res)=>res.json()));
  }

  getTextPromotion(){
    return this.http.post(this.local+"/api/dataAdjust.php",{ac:"getPromotion",type:2}).pipe(map((res)=>res.json()));
  }

  getTextHowtoplay(){
    return this.http.get(this.local+"/api/dataAdjust.php?ac=getHowtoplayText").pipe(map((res)=>res.json()));
  }
 
  getMenu(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getMenu",type:'1'}).pipe(map((res)=>res.json()));;
  }
  getDataPage(data){
      return this.http.post(this.local+"/api/dataAdjust.php",{ac:"getDataPage",data:data}).pipe(map((res)=>res.json()));
  }

  getSlide(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getSlide",type:'1'}).pipe(map((res)=>res.json()));;
  }
  
  getPopup(){
    // return this.http.post<adjustpageData>(this.host_config+'/api/dataAdjust.php',{ac:"saveAdjustPage",data:data});
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getPopup"}).pipe(map((res)=>res.json()));;
  }

  getSetting(){
    return this.http.post(this.local+'/api/dataAdjust.php',{ac:"getSetting"}).pipe(map((res)=>res.json()));
  }
  saveMember(data:string){
    return this.http2.post<contactData>(this.local+'/api/dataAdjust.php',{ac:"saveMember",data:data});
  }
//   getTodoMenuList(){
//     return this.http.get("https://well-directed-actio.000webhostapp.com//api/getMenu.php?ac=getMainMenu").map((res)=>res.json());
//  }
}
interface contactData{
  success:boolean,
  message:string,
  data:string,
  contact_text_detail:string,
  type:string
}
