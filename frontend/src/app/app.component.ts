import { Component } from '@angular/core';
import { LogicService } from './services/logic.service';
import { Color } from './Classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(public logic:LogicService){}

  Color=Color

  snapNewTab(url:string){
    window.open(url, "_blank")
  }

}
