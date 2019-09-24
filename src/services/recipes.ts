import { Injectable } from "@angular/core";

import { Http, Response } from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class RecipesService {
  
  constructor(private http:Http) {}






 fetchRecipes(items: string) {
    const apiKey = '182e1fd94dac3bb11bb0bae6a70cd269';
    console.log('inside');
    console.log(items);
    this.http.get(`http://food2fork.com/api/search?key=${apiKey}&q=flour,cheese`)
    .map((response: Response) => {
      console.log(response.json);
      
     
    }) 
    .do((recipes) => {
      return recipes; 
    });
  }



  
}
