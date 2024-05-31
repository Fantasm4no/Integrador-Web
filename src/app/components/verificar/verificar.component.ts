import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verificar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './verificar.component.html',
  styleUrl: './verificar.component.scss'
})
export class VerificarComponent {

  constructor() { }

  ngOnInit(): void {
  }

}
