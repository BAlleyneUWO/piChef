import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-find-details',
  templateUrl: 'find-details.html',
})
export class FindDetailsPage {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindDetailsPage');
  }

}
