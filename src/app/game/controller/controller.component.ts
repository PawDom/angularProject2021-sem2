import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css'],
})
export class ControllerComponent {
  @Input() ready: string;
  @Input() game;

  constructor() {}

  ngOnInit(): void {}
}