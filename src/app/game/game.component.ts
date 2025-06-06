import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatInputModule } from '@angular/material/input';
import { GameInfoComponent } from "../game-info/game-info.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatInputModule, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  cardStack = [1, 2, 3, 4];
  pickCardAnimation = false;
  game: Game = new Game;
  currentCard :string | undefined;
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game, this.currentCard);
  }

  takeCard(isTaken:boolean){
    if(!this.pickCardAnimation && this.game.players.length !== 0) {
      this.pickCardAnimation = isTaken;
      this.currentCard = this.game.stack.pop();
      this.game.currentPlayer++;
      this.game.currentPlayer %= this.game.players.length;
      setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          setTimeout(() => {
            this.pickCardAnimation = false;
          }, 50); 
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
    });

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.trim()) {
        this.game.players.push(name);
      }
    });
  }
}
