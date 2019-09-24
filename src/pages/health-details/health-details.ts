import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-health-details',
  templateUrl: 'health-details.html',
})
export class HealthDetailsPage {

  recipeData;
  url:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitize: DomSanitizer
  ) {
    this.recipeData = this.navParams.data;
    console.log(this.recipeData);
  }

  urlpaste(){
    this.url =this.recipeData.url;
    return this.sanitize.bypassSecurityTrustResourceUrl(this.url);
  }

}
