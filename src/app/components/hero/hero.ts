import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="about">

      <div class="container hero-layout">
        <div class="hero-content">
          <h1 class="headline" [innerHTML]="profileData().headline"></h1>

          <p class="description" [innerHTML]="profileData().description"></p>

          <div class="cta-group">
            @if (profileData().github) {
              <a [href]="profileData().github" target="_blank" class="btn btn-outline cv-btn">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                  class="btn-icon-img invert-dark"
                />
                GitHub
              </a>
            }
            @if (profileData().linkedin) {
              <a
                [href]="profileData().linkedin"
                target="_blank"
                class="btn btn-outline cv-btn"
              >
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
                  alt="LinkedIn"
                  class="btn-icon-img"
                />
                LinkedIn
              </a>
            }
            @if (profileData().resumeUrl) {
              <a [href]="profileData().resumeUrl" target="_blank" class="btn btn-primary cv-btn">
                <span class="material-symbols-outlined">download</span>
                Get Resume
              </a>
            }
          </div>
        </div>

        <div class="hero-visual">
          <div class="image-wrapper">
            <div class="profile-frame">
              <div class="profile-inner">
                <img [src]="profileData().pictureUrl" alt="Facundo Salvucci" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit {
  private dbService = inject(DbService);

  profileData = signal({
    headline: 'Building reliable <br /> <span class="digital-text">web apps</span> with a focus on quality.',
    description: `I'm a <span class="highlight">Full-Stack Developer & QA Specialist</span> with over 3
      years of experience in <span class="highlight-angular">Angular</span> and
      <span class="highlight-firebase">Firebase</span>, building functional web applications
      and ensuring quality through rigorous testing.`,
    github: 'https://github.com/SalvucciFacundo',
    linkedin: 'https://www.linkedin.com/in/facundo-salvucci',
    resumeUrl: 'assets/facundo-salvucci_cv.pdf',
    pictureUrl: 'assets/profile2.jpg'
  });

  ngOnInit() {
    this.dbService.getProfile().subscribe(profile => {
      if (profile) {
        this.profileData.update(current => ({
          ...current,
          headline: profile.headline || current.headline,
          description: profile.summary || profile.description || current.description,
          pictureUrl: profile.pictureUrl || current.pictureUrl
        }));
      }
    });

    this.dbService.getContactInfo().subscribe(contact => {
      if (contact) {
        this.profileData.update(current => ({
          ...current,
          github: contact.github || current.github,
          linkedin: contact.linkedin || current.linkedin,
          resumeUrl: contact.resumeUrl || contact.cvUrl || current.resumeUrl
        }));
      }
    });
  }
}
