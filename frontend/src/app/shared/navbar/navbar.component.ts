import {Component, ElementRef, OnInit, viewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');
  modeText = viewChild<ElementRef<HTMLElement>>('modeText');

  ngOnInit(): void {
    this.evaluateModeText()
  }

  onToggleMode() {
    document.body.classList.toggle('dark');
    this.evaluateModeText();
  }

  onToggleSidebar() {
    this.sidebar()?.nativeElement.classList.toggle('close');
  }

  private evaluateModeText() {
    if (document.body.classList.contains('dark')) {
      this.modeText()!.nativeElement.innerText = "Light mode";
    } else {
      this.modeText()!.nativeElement.innerText = "Dark mode";
    }
  }
}
