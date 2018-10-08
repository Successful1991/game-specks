import { ChangeDetectorRef ,Component, OnInit } from '@angular/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public field: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', ''];
  public victory: boolean = false;
  public sizeWindow = window.innerWidth;
  constructor(private cdr: ChangeDetectorRef) {
    let getWindow = () => {
      return window.innerWidth;
    };
    window.onresize = () => {
      this.sizeWindow = getWindow();
      this.cdr.detectChanges(); //running change detection manually
    };
  }

  ngOnInit() {}

  comparisonActiveEmptyItems(index) {
    let indexEmptyElement = this.field.indexOf('');
    const elementIndex = index;
    const emptyLine = Math.floor((indexEmptyElement + 4) / 4);
    const elementLine = Math.floor((elementIndex + 4) / 4);
    const amountRepeat = elementIndex - indexEmptyElement;

    if (elementLine === emptyLine) {  //проверка по оси X
      this.checkDirection(amountRepeat,1);
    }
    else if(indexEmptyElement % 4 === elementIndex % 4) {  //проверка по оси Y
      this.checkDirection(amountRepeat/4,4);
    }
  }

  checkDirection(amountRepeat,step){
    if(amountRepeat > 0){
      for(let i = amountRepeat; i > 0; i--){
        let emptyElement = this.field.indexOf('');
        this.field[emptyElement] = this.move(step,'+',emptyElement);
        this.checkResult();
      }
    }else if(amountRepeat < 0){
      for( let i = amountRepeat; i < 0;i++){
        let emptyElement = this.field.indexOf('');
        this.field[emptyElement] = this.move(step,'-',emptyElement);
        this.victory = this.checkResult();
      }
    }

  }

  move(step,operators,el) {
      let temporary;
      switch (operators) {
        case '-':
          temporary = this.field[el - step];
          this.field[el - step] = this.field[el];
          break;
        case '+':
          temporary = this.field[el + step];
          this.field[el + step] = this.field[el];
          break;
      }
    return temporary;
  }

  checkResult(){
    for(let i = 1; i < this.field.length; i++){
      if(+this.field[i-1] !== i){return this.victory = false;}
    }

    this.victory = true;
    setTimeout(()=>{this.victory = false},2000);
  }

  mixItemsAll(){
    for(let j = 0; j < 80; j++ ){
      let index = this.field.indexOf('');
      this.mixItems(index);
    }
  }

  mixItems(index){
    let random = (Math.floor(Math.random() * (16 - 1)) + 1) - 1;
    if( (random+4)%4 === (index+4)%4 || Math.floor((index+4)/4) === Math.floor((random+4)/4 )) {
      this.comparisonActiveEmptyItems(random);
    }else{
      return this.mixItems(index);
    }
  }


}

