import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navabar } from "./components/navabar/navabar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navabar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('progetto');
}
