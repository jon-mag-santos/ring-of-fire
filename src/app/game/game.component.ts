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
  playedCardAnimation = false;
  game: Game = new Game;
  currentCard :string | undefined;
  playedCard :string | undefined;

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game, this.currentCard);
  }

  takeCard(isTaken:boolean){
    if(!this.playedCardAnimation)
      this.playedCardAnimation = true;

    if(!this.pickCardAnimation) {
      this.pickCardAnimation = isTaken;
      this.currentCard = this.game.stack.pop();

      setTimeout(() => {
          this.playedCard = this.currentCard;
          this.game.playedCard.push(this.playedCard); 
          setTimeout(() => {
            this.pickCardAnimation = false;
        }, 150);
      }, 1500);
    }
  }

}
