import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DataService } from '../../data.service';
import { Players } from './players';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnChanges   {

  players: Players[] = [];

  constructor(public _dataService: DataService){

  }

  ngOnInit(): void{

    this._dataService.getUsers().subscribe((response)=>{
      this.players = response;
    })

  }
  key: string = "name";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }

  ngOnChanges(): void {
 
  }
}
