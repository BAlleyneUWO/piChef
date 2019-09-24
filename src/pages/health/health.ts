import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { HealthDetailsPage } from '../health-details/health-details';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { AdMobFreeInterstitialConfig, AdMobFree } from '@ionic-native/admob-free';


@Component({
  selector: 'page-health',
  templateUrl: 'health.html',
})
export class HealthPage {
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
    public toastCtrl:ToastController,
    private adMob: AdMobFree
  ) {
    this.prepareIntersitial();
    this.recipes = null;
    this.pictures=[];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthPage');
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

  closeHealth(){
    this.navCtrl.pop();
  }

  info(){
    let toast = this.toastCtrl.create({
      message:'Recipes will not appear within the range. However, if you enter 2 small numbers such as min-2 and max-5. The recipes with the lowest calories will be displayed.',
      duration: 8000
    });
    toast.present();
  }

  onSearch(form:NgForm){
    this.count++;
    let query="";
    let diet="&";
    let health="&";
    console.log(form);
    let loader = this.loadingCtrl.create({
      spinner:'bubbles',
      content: 'Searching recipes...'
 });

 loader.present();
 
 this.disableButtonTimer();

 this.pictures=[];
 
 /*
  health=
  diet=
  excluded=
  calories=min-max
 */ 
if(form.value.exclude !="")
{
let exclude=form.value.exclude;
let excludeArr = exclude.split(",");
exclude='&';
excludeArr.forEach(ele => {
    exclude+='excluded='+ele.trim()+'&';
});
query+=exclude;
console.log(exclude);
}


if(form.value.max!="" && form.value.min!="")
{

let calories = '&calories='+form.value.min+'-'+form.value.max+'&';
query+=calories;
console.log(calories);
}

if(form.value.dRestrict != undefined )
{
 form.value.dRestrict.forEach(ele => {
      diet+='diet='+ele+'&';
 });
 query+=diet;
 console.log(diet);
}

if(form.value.hRestrict != undefined )
{
 form.value.hRestrict.forEach(ele => {
      health+='health='+ele+'&';
 });
 query+=health;
 console.log(health);
}
//Always need & before and after
console.log(query);
 
this.http.get('https://api.edamam.com/search?app_id=1552aa9f&to=20&app_key=e3487bcdfc122363561c1316c1a40928'+query+'q='+form.value.items).map(res=>res.json())
.subscribe(data=>{
  loader.dismiss();
  this.recipes=data.hits;
  this.pictures=data.hits;
  this.results=true;
  console.log(data.hits);
  this.err=false;
  this.pictures.forEach(ele => {
     ele.recipe.calories= Math.round(ele.recipe.calories);
  });

  if(this.count==5)
  {
    this.adMob.interstitial.prepare()
    .then(()=>{
       this.adMob.interstitial.show();
    })
    .catch(e=>console.log(e));
  }


  if(this.pictures === undefined || this.pictures.length == 0){
    this.results=false;
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

  detailsPage(recipe){
    this.navCtrl.push(HealthDetailsPage,recipe);
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
