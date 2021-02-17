import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"
// import * as M from '../../../assets/script/materialize/js/materialize.min.js';
import * as $ from 'jquery';
import * as AOS from 'aos';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public user_name:string;
  public user_tel:string;
  public user_line:string;
  images = [  
     //{ img: "/assets/images/bg_slide/Slide2.jpg" },  
     //{ img: "/assets/images/bg_slide/slide1.jpg" },
  ];  
  
  slideConfig = {
    "slidesToShow": 1,  
    "dots": false,  
    "infinite": true ,
    "autoplay":true ,
    "autoplaySpeed":7000,
    mobileFirst: true,
    centerMode: true,
    arrows: false,
    centerPadding: '0.1px',
  };
  height: string = '';
  imageSize:{width:600, height: 300};
  arrowSize: string = '30px';
  showArrows: boolean = false;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 7000;
  stopAutoPlayOnSlide: boolean = true;
  debug: boolean = false;
  backgroundSize: string = '100% 100%';
  backgroundPosition: string = 'top center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = false;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;
  imageObject: Array<object> = [{
      // image: '/assets/images/bg_slide/Slide2.jpg',
      // thumbImage: '/assets/images/bg_slide/Slide2.jpg'
  }, 

  
  // {
  //     image: '/assets/images/content/slide2.jpg',
  //     thumbImage: '/assets/images/content/slide2.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // },{
  //     image: '/assets/images/content/slide3.jpg',
  //     thumbImage: '/assets/images/content/slide3.jpg',
  //     //title: 'Image with title' //Optional: You can use this key if you want to show title
  // }
  ];
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  // imageUrls: (string | IImage)[] = [
  //   { url: '/assets/images/bg_slide/Slide2.jpg' },
  //   // { url: '/assets/images/bg_slide/slide3.jpg' },
  //   // { url: '/assets/images/content/slide3.jpg' }
  // ];
  imageUrls = [  
    //  { img: "/assets/images/bg_slide/slide1.jpg" },  
    //  { img: "/assets/images/bg_slide/Slide2.jpg" },
  ];
  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];

  options = {
    fullWidth: true
  };
  ngOnInit() {
    // var elems = document.querySelectorAll('.carousel');
    // var instances = M.Carousel.init(elems,this.options);

    
    this.todoServcie.getTodoList(0).subscribe((response)=>{
     // console.log(response);
      this.todoList = response;
    });
    
    this.todoServcie.getSlide().subscribe((response)=>{
        var arraySlide = [];
        for(var i =0; i<response.length;i++){
          arraySlide.push({ img: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
          //arraySlide.push({ url: '/upload/files/'+response[i].adjust_page_image_name+'.'+response[i].adjust_page_image_type+'?v=1.2' });
        }
        
     this.imageUrls = arraySlide;
    });
  }
  onSubmit(form: NgForm): void {
    this.todoServcie.saveMember(form.value).subscribe(data=>{
     if(data.success){
      alert("รอการตอบกลับจากพนักงาน");
     }else{
      alert("กรุณาลองอีกครั้ง");
     }
      
    });
  }
}

interface Todo{
  adjust_page_id:number;
  adjust_page_type:string;
  adjust_page_title:string;
  adjust_page_description:string;
  adjust_page_short_description:string;
  adjust_page_image_name:string;
  adjust_page_image_type:string;
}

interface slideData {
  adjust_page_id :string;
  adjust_page_type :string;
  adjust_page_title :string;
  adjust_page_description :string;
  adjust_page_short_description :string;
  adjust_page_image_name :string;
  adjust_page_image_type :string;
  adjust_page_sort :string;
  adjust_page_hide :string;
  adjust_page_delete :string;
  adjust_page_create_by :string;
  adjust_page_create_date :string;
  adjust_page_update_date :string;
}
