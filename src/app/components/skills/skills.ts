import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Skill {
  name: string;
  imgUrl?: string;
  icon?: string;
  color: string;
  bgColor: string;
  featured?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="skills" id="skills">
      <div class="container">
        <div class="skills-header">
          <h2 class="subtitle">Core Ecosystem</h2>
          <h3 class="title">Tools I use to build</h3>
        </div>

        <div class="skills-grid">
          @for (skill of skills; track skill.name) {
            <div class="skill-card" [class.featured]="skill.featured" [style.--skill-color]="skill.color">
              @if (skill.featured) {
                <div class="years-badge">3+ YEARS</div>
              }
              <div class="skill-icon" [style.background-color]="skill.bgColor">
                @if (skill.imgUrl) {
                  <img [src]="skill.imgUrl" [alt]="skill.name" class="brand-icon">
                } @else {
                  <span class="material-symbols-outlined" [style.color]="skill.color">{{ skill.icon }}</span>
                }
              </div>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  skills: Skill[] = [
    { 
      name: 'Angular', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg', 
      color: '#dd0031', 
      bgColor: '#fef2f2' 
    },
    { 
      name: 'Firebase', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg', 
      color: '#ffca28', 
      bgColor: '#fffbeb' 
    },
    { 
      name: 'TypeScript', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
      color: '#007acc', 
      bgColor: '#f0f9ff'
    },
    { 
      name: 'JavaScript', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 
      color: '#F7DF1E', 
      bgColor: '#fffbeb' 
    },
    { 
      name: 'SCSS', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', 
      color: '#bf4080', 
      bgColor: '#fdf2f8' 
    },
    { 
      name: 'Java', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', 
      color: '#007396', 
      bgColor: '#e6f3f7' 
    },
    { 
      name: 'Postman', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', 
      color: '#FF6C37', 
      bgColor: '#fff1ec' 
    },
    { 
      name: 'GitHub', 
      imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 
      color: '#ea580c', 
      bgColor: '#fff7ed' 
    }
  ];
}
