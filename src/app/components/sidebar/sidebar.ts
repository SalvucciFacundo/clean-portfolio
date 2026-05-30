import {
  Component,
  Inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  signal,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="sidebar-dock">
      <button class="icon-btn theme-toggle" (click)="toggleTheme()" [title]="isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
        <span class="material-symbols-outlined">
          {{ isDarkMode() ? 'light_mode' : 'dark_mode' }}
        </span>
      </button>
      <div class="divider"></div>
      <a href="https://github.com/SalvucciFacundo" target="_blank" class="icon-btn" title="GitHub">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          class="sidebar-icon-img invert-dark"
        />
      </a>
      <a href="https://www.linkedin.com/in/facundo-salvucci" target="_blank" class="icon-btn" title="LinkedIn">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
          alt="LinkedIn"
          class="sidebar-icon-img"
        />
      </a>
    </aside>
  `,
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  isDarkMode = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Only access localStorage in the browser (SSR safety)
    afterNextRender(() => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        this.isDarkMode.set(true);
        document.body.classList.add('dark-theme');
      }
    });
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.isDarkMode.set(!this.isDarkMode());
    if (this.isDarkMode()) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
