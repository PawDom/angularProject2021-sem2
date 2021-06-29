import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { GameComponent } from './game/game.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TetrisCoreModule} from 'ngx-tetris';
import { ControllerComponent } from './game/controller/controller.component';
import { ListComponent } from './game/list/list.component';
import { HttpClientModule } from '@angular/common/http';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
// import { NgxPaginationModule } from 'ngx-pagination';

const appRoutes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'game/:color', component: GameComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
  { path: '**', redirectTo: '/game/:color' },
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    GameComponent,
    ControllerComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    TetrisCoreModule,
    HttpClientModule,
    OrderModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
