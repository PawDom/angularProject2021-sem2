import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

// export interface Player {
//   name: string;
//   email: string;
// }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  public name: string;
  public token: string;
  public colors: Array<string> = ['black&white', 'color'];
  public selectedColor: string = 'black&white';
  constructor(private _router: Router, private _dataService: DataService, public formBuilder: FormBuilder) {}

  public myNewForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
    token: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
    ],
    color: [this.selectedColor],
  });

  // odpala na przycisku, zbiera dane z formularza
  public onSubmit(form): void {
    this.logIn(form.value.color, form.value.name, form.value.token);
  }

  logIn(color, name, token) {
    this._dataService.checkToken(token).subscribe((res) => {
        let token: any = res;
        if (!token.success) return alert('This is not your index, mate!');
        //jeśli dane są poprawne ustawia dane
        if (name && name.match(/\S/)) {
          this._dataService.setData({ name, token });
          this._router.navigate(['/game', color]);
        } else {
          alert('Your name must be at least 2 digit long and no longer than 12!');
        }
      },
      (error) => {
        return alert(`Can't connect with server`); // wyrzuca błąd gdy brakuje serwera
      }
    );
  }
}