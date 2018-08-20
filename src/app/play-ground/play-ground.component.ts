import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css']
})
export class PlayGroundComponent{

  @ViewChild('playersForm') playersForm : NgForm;
  onGameStart: boolean = false;
  xPlayer: string = "";
  oPlayer: string = "";


  registerPlayers(){
    this.xPlayer = this.playersForm.value.xPlayer;
    this.oPlayer = this.playersForm.value.oPlayer;
    this.onGameStart = true;
  }
}
