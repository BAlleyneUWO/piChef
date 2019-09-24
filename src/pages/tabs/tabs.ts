import { Component } from '@angular/core';

import { CookbookPage } from '../cookbook/cookbook';
import { FindPage } from '../find/find';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CookbookPage;
  tab2Root = FindPage;

  constructor() {

  }
}
