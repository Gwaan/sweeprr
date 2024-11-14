import {Component, ElementRef, inject, OnInit, viewChild, ViewEncapsulation} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  router = inject(Router);
  sidebar = viewChild<ElementRef<HTMLElement>>('sidebar');
  modeText = viewChild<ElementRef<HTMLElement>>('modeText');

  menuLinks: MenuLinkDescriptor[] = [
    {
      route: ['/'],
      iconClass: 'bx bx-home icon',
      label: 'Dashboard'
    }, {
      route: ['/test'],
      iconClass: 'bx bx-camera-movie',
      label: 'Movies'
    }, {
      route: ['/test2'],
      iconClass: 'bx bx-tv ',
      label: 'Tv shows'
    }, {
      route: ['/test3'],
      iconClass: 'bx bx-cog',
      label: 'Settings'
    }
  ];

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

  isActive(activeRoute: string[]): boolean {
    return activeRoute.join('/') === this.router.url;
  }
}

export interface MenuLinkDescriptor {
  route: string[];
  iconClass: string;
  label: string;
}
