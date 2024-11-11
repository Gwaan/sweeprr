import {Component, ElementRef, viewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  body: HTMLElement = document.body;
  sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');
  toggle = viewChild<ElementRef<HTMLElement>>('toggle');
  searchBtn = viewChild<ElementRef<HTMLElement>>('search-box');
  modeSwitch = viewChild<ElementRef<HTMLElement>>('toggle-switch');
  modeText = viewChild<ElementRef<HTMLElement>>('mode-text');

  onToggle() {
    document.body.classList.toggle('dark');
  }
}
