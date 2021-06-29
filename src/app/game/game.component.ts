import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { timer } from 'rxjs';


import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  public sek: number = 0;
  public h: number = 0;
  public min: number = 0;
  private timeCounter: any = 0;

  
  public points: number = 0;
  // public seconds: number = 0;
  // public minutes: number = 0;
  private _interval: any;
  public data: any;
  public status: string = 'ready';
  public class: string = undefined;

  public sendedData: boolean = false;

  public color: string;
  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _route: ActivatedRoute
  ) {
    this.color = this._route.snapshot.params.color;
    if (this.color === 'black&white') {
      this.class = 'black-and-white';
    }
  }

  ngOnInit(): void {
    this.data = this._dataService.getData();
  }

  goBack() {
    this._router.navigateByUrl('/form');
  }

  reset() {
    this._addPoints();
    this.points = 0;
    clearInterval(this.timeCounter);
    this.sek = 0;
    this.min = 0;
    this.h = 0;
    this.status = 'ready';
  }


  statusStarted(){
    
    this.status = 'started';
  }

  statusStopped(){
    this.status = 'paused';
  }

  timeStop() {
    
    if (this.status = 'paused') {
      clearInterval(this.timeCounter);
    };
  };

  countTime() {
    this.sek += 1;
    if (this.sek == 60) {
      this.sek = 0;
      this.min += 1;
    }
    if (this.min == 60) {
      this.min = 0;
      this.h += 1;
    }
  };


  timeStart() {
    if (this.status = 'started') {
      this.timeCounter = setInterval(() => this.countTime(), 1000);
    };

    timer(30000, 30000).subscribe(() => {
      if (this.points !== 0) {
        this._addPoints();
      }
    });
  };

  gameStarted(){
    this.timeStart();
    this.statusStarted();
  };

  gameStoped(){
    this.statusStopped();
    this.timeStop();
  };

  onLineCleared() {
    this.points += 1;
  }

  onGameOver() {
    this._addPoints();
    this.timeStop();
    alert('game over');
  }


  private _addPoints() {
    this._dataService
      .sendScore(
        {
          name: this.data.name,
          score: this.points,
        },
        this.data.token
      )
      .subscribe();
    this.sendedData = !this.sendedData;
  }


}