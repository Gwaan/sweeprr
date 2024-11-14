import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit(): void {
    const prefersDark: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      document.body.classList.add('dark');
    }
  }


}
