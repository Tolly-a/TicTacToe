import { Component,  AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaygroundService } from '../playground.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements AfterViewInit {

  @Input('xPlayer') xPlayerName: string;
  @Input('oPlayer') oPlayerName: string;
  @Output() clearBoard = new EventEmitter<any>();
  drawCount: number = 0;
  xPlayerCount: number = 0;
  oPlayerCount: number = 0;
  winnerName: string = null;
  accountEntries: string[] = [];

  constructor(private playgroundService: PlaygroundService) {}


  ngAfterViewInit(){
    this.playgroundService.getData()
    .subscribe((data) => {
        this.winnerName = data;
        if(this.winnerName){
          if(this.winnerName === this.xPlayerName){
            this.xPlayerCount ++;
          } if(this.winnerName === this.oPlayerName){
            this.oPlayerCount ++;
          } if(this.winnerName === "draw"){
            this.drawCount ++;
          }
          this.makeEntryInAccount(this.winnerName);
        }
    })
  }

  makeEntryInAccount(winnerName){
    this.accountEntries.push(winnerName);
  }

  startNewSet(){
    this.playgroundService.setData("clearBoard");
    this.drawCount = 0;
    this.xPlayerCount = 0;
    this.oPlayerCount = 0;
    this.winnerName = null;
    this.accountEntries = [];
  }

}
