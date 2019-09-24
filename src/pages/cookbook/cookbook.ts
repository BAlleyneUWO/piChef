import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-cookbook',
  templateUrl: 'cookbook.html',
})
export class CookbookPage {
  adTimerVar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
      private adMob: AdMobFree,
      private localNotify:LocalNotifications
    ) {
    this.showInterstial();
    this.showBannerAd();
    this.scheduleNotifications();
  }
 //android ca-app-pub-6282102060369150~1544552202
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CookbookPage');
  }

  scheduleNotifications(){
     this.localNotify.schedule({
       id:1,
       title: 'Feeling Hungry?',
       text:'Come look up some interesting recipes and get cooking :)',
       trigger: {at: new Date(2018,new Date().getMonth(),(new Date().getDay())+2)}
     })
  }

   async showInterstial(){
    this.adTimerVar = Observable.interval(60000).subscribe(x=>{
       console.log(x);
       if(x==2)
       {
        this.prepareIntersitial();
        console.log('intersitial');
       }
       else
       if(x%7==0 && x!=0){
        console.log('intersitial');
        this.prepareIntersitial();
       }
    })
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

 async prepareIntersitial(){
  try{
    const interstitialConfig: AdMobFreeInterstitialConfig={
      //ca-app-pub-6282102060369150/1301295034
       id:'ca-app-pub-6282102060369150/1301295034',
       isTesting:false,
       autoShow:true
    }
    this.adMob.interstitial.config(interstitialConfig);

    const result = await this.adMob.interstitial.prepare();
    console.log(result);
 }
 catch(e){

 }
 }

}
