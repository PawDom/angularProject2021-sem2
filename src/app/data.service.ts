import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Players } from './game/list/players';

export interface Player {
  name: string;
  score: number;
}

export interface PlayersList {
  ranking: Array<Player>;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any;

  constructor(private _http: HttpClient) {}

  url: string = `${environment.apiURL}/scores`;

  public getUsers(){
    return this._http.get<Players[]>(this.url, {
      headers: {
        accept: 'application/json',
      },
    });
  };

  public checkToken(token) {
    return this._http.post(
      `${environment.apiURL}/check-token`,
      {
        'auth-token': token,
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );
  }

  public sendScore(body, token) {
    body = { ...body, ...{ 'auth-token': token } };
    return this._http.post(`${environment.apiURL}/scores`, body);
  }

  public setData(data: any) {
    this.data = data;
  }

  public getData(): any {
    return this.data;
  }
}