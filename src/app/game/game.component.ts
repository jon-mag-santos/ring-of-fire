import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  cardStack = [1, 2, 3, 4];
  pickCardAnimation = false;
  game: Game | undefined;

  ngOnInit(): void {
    this.newGame();
  }

  takeCard(isTaken:boolean){
    this.pickCardAnimation = isTaken;
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
}
