import { ChangeDetectionStrategy, Component } from '@angular/core';

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
              <div class="skill-icon" [style.background-color]="skill.bgColor" [style.color]="skill.color">
                <span class="material-symbols-outlined">{{ skill.icon }}</span>
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
  skills = [
    { name: 'Angular', icon: 'change_history', color: '#dd0031', bgColor: '#fef2f2' },
    { name: 'Firebase', icon: 'local_fire_department', color: '#ffca28', bgColor: '#fffbeb' },
    { name: 'TypeScript', icon: 'javascript', color: '#42b6f0', bgColor: '#f0f9ff', featured: true },
    { name: 'SCSS', icon: 'palette', color: '#bf4080', bgColor: '#fdf2f8' },
    { name: 'Cypress/QA', icon: 'fact_check', color: '#7c3aed', bgColor: '#f5f3ff' },
    { name: 'Git', icon: 'history', color: '#ea580c', bgColor: '#fff7ed' }
  ];
}
