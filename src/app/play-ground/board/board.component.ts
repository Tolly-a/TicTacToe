import { Component, OnInit, Input } from '@angular/core';
import { PlaygroundService } from '../playground.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  squares = Array(9).fill("");
  @Input() xPlayer: string;
  @Input() oPlayer: string;
  statusSubject: string;
  count: number = 0;


  playerToken = "X";
  playerName: string;
  winner = null;
  winLine = [];
  winSquare_1:number = null;
  winSquare_2:number = null;
  winSquare_3:number = null;

  get status() {
    if(this.statusSubject === "draw"){
      return this.statusSubject;
    } else {
      return this.winner ? `${this.statusSubject}: ${this.winner}` : `${this.statusSubject}: ${this.playerName}`
    }
  }

  constructor(private playgroundService: PlaygroundService) { }

  ngOnInit() {
    this.playgroundService.getData()
    .subscribe((data) => {
      if(data === 'clearBoard'){
        this.newGame();
      }
    })

    if (!this.playerName ) {
      this.newGame()
    }
  }

  newGame() {
    this.squares = Array(9).fill("");
    this.statusSubject = 'Firs move';
    this.playerName = this.xPlayer;
    this.playerToken = "X";
    this.winner = null;
    this.winLine = [];
    this.count = 0;
    this.winSquare_1 = null;
    this.winSquare_2 = null;
    this.winSquare_3 = null;
  }

  move(positionSquare: number) {

    if (!this.winner && !this.squares[positionSquare]) {
      this.squares[positionSquare] = this.playerToken;

      if (this.isWinning()) {
        //at this point, we determine the winner
        this.winner = this.playerName;
        // send winner name to account component
        this.playgroundService.setData(this.winner);
      } else {
        if (this.count === 8) {
          this.statusSubject = "draw";
          this.winner = "draw";
          this.playgroundService.setData(this.winner);
        } else {
          if (this.playerToken === 'X') {
            this.playerToken = 'O';
            this.playerName = this.oPlayer;
            this.statusSubject = "Next move";
          } else {
            this.playerToken = 'X';
            this.playerName = this.xPlayer;
            this.statusSubject = "Next move";
          }
        }
      }
    }
    this.count++;
  }

  isWinning(): boolean {
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], //row
      [0, 3, 6], [1, 4, 7], [2, 5, 8], //col
      [2, 4, 6], [0, 4, 8] //
    ];

    for (let line of winLines) {
      if (this.squares[line[0]] //not empty
        && this.squares[line[0]] === this.squares[line[1]]
        && this.squares[line[1]] === this.squares[line[2]]) {

        this.statusSubject = "Winner";
        this.winSquare_1 = line[0]; //0
        this.winSquare_2 = line[1]; //4
        this.winSquare_3= line[2]; //8
        return true;
      }
    }
    return false;
  }

}
