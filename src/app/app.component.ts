import { ChangeDetectorRef ,Component, OnInit } from '@angular/core';

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


  clickElement(index) {
    this.searchEmptyElement(index);
  }
  searchEmptyElement(index) {
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
        this.move(step,'+',emptyElement);
      }
    }else if(amountRepeat < 0){
      for( let i = amountRepeat; i < 0;i++){
        let emptyElement = this.field.indexOf('');
        this.move(step,'-',emptyElement);
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
    this.field[el] = temporary;
    this.checkResult();
  }

  checkResult(){
    for(let i = 1; i < this.field.length; i++){
      if(+this.field[i-1] !== i){return}
    }
    this.victory = true;
    setTimeout(()=>{this.victory=false},2000)
  }

  mixItems(){
    for(let j = 0; j < 10; j++ ){

      this.field.map( (item,index) => {
        let i = index;
          let random = (Math.floor(Math.random() * (5 - 1)) + 1);
        switch (random){ //1 = up; 2 = right; 3 = down; 4 = left;
          case 1:
            if((i+1)-4 > 0) {
              this.move(4,'-',i);
            }else{
              this.move(4,'+',i);
            }
            break;
          case 2:
            if((i+1)%4 !== 0 ){
              this.move(1,'+',i);
            }else{
              this.move(1,'-',i);
            }
            break;
          case 3:
            if( ((i+1)+4)< 17 ) {
              this.move(4,'+',i);
            }else{
              this.move(4,'-',i);
            }
            break;
          case 4:
            if( (i+1+4)%4 !== 1 ) {
              this.move(1,'-',i);
            }else{
              this.move(1,'+',i);
            }
            break;

        }

      });
    }

  }
}

