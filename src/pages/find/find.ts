import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { RecipesService } from '../../services/recipes';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HealthPage } from '../health/health';
import { FindDetailsPage } from '../find-details/find-details';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { AdMobFree, AdMobFreeBanner, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-find',
  templateUrl: 'find.html',
})
export class FindPage {
  public recipes:any;
  pictures;
  results:boolean=true;
  timerVar;
  timerVal;
  timerBol=false;
  err=false;
  count:number=0;
  

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl:LoadingController,
    private adMob: AdMobFree
  ) {
    this.showBannerAd();
    this.prepareIntersitial();
    this.recipes = null;
    this.pictures=[];
   
  }

 


  async showBannerAd(){
    try{
      //android banner ca-app-pub-6282102060369150/1100439891
    const bannerConfig: AdMobFreeBannerConfig ={
      id:'ca-app-pub-6282102060369150/1100439891',
      isTesting: false,
      autoShow: true
    }
  

    this.adMob.banner.config(bannerConfig);
    try{
         const result = this.adMob.banner.prepare();
         console.log(result);
    }catch (e){

    }
  }
  catch(e){

  }

  }



  disableButtonTimer(){
        this.timerVar = Observable.interval(1000).subscribe(x=>{
            this.timerVal=x;
            this.timerBol=true;
          

            if(x == 15){
              this.timerVar.unsubscribe();
              this.timerBol=false;
              this.timerVal='';
            }
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindPage');
  }

  onSearch(form:NgForm){
    this.count++;
    console.log(this.count);
    let loader = this.loadingCtrl.create({
         spinner:'bubbles',
         content: 'Searching recipes...'
    });

    loader.present();

    this.disableButtonTimer();

    this.pictures=[];
    console.log(form.value.items);
    this.http.get('https://api.edamam.com/search?app_id=1552aa9f&to=20&app_key=e3487bcdfc122363561c1316c1a40928&q='+form.value.items).map(res=>res.json())
    .subscribe(data=>{
      loader.dismiss();
      this.recipes=data.hits;
      this.pictures=data.hits;
      this.results=true;
      console.log(data.hits);
 
      this.pictures.forEach(ele => {
        ele.recipe.calories= Math.round(ele.recipe.calories);
     });

      if(this.pictures === undefined || this.pictures.length == 0){
        this.results=false;
      }

      if(this.count==5)
      {
        this.adMob.interstitial.prepare()
        .then(()=>{
           this.adMob.interstitial.show();
        })
        .catch(e=>console.log(e));
      }
     /* this.recipes.forEach(element => {
        //this.pictures.push(element.recipe.image);

      });*/
 
    },
    err =>{
      loader.dismiss();
      this.err=true;
      console.log('false');
    }
   );
    
  }

  openHealth(){
    this.navCtrl.push(HealthPage);
  }

  detailsPage(recipe){
    this.navCtrl.push(FindDetailsPage,recipe);
  }



 async prepareIntersitial(){
  try{
    const interstitialConfig: AdMobFreeInterstitialConfig={
      //ca-app-pub-6282102060369150/1301295034
       id:'ca-app-pub-6282102060369150/1301295034',
       isTesting:false,
       autoShow:false
    }
    this.adMob.interstitial.config(interstitialConfig);

    const result = await this.adMob.interstitial.prepare();
    console.log(result);
 }
 catch(e){

 }
 }




}
