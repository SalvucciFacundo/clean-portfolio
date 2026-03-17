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
  styles: [`
    .skills {
      background-color: white;
      text-align: center;
      padding: 8rem 0;
    }

    .skills-header {
      margin-bottom: 4rem;
    }

    .subtitle {
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.2em;
      font-size: 0.875rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 2.5rem;
      font-weight: 900;
      color: var(--text-main);
    }

    .skills-grid {
      display: grid;
      grid-template-cols: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1.5rem;
      
      @media (min-width: 1024px) {
        grid-template-cols: repeat(6, 1fr);
      }
    }

    .skill-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      padding: 2.5rem 1.5rem;
      background: white;
      border: 1px solid rgba(226, 232, 240, 0.6);
      border-radius: 1.5rem;
      transition: var(--transition);
      cursor: default;

      &:hover:not(.featured) {
        border-color: var(--skill-color);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
        transform: translateY(-5px);
      }

      &.featured {
        border: 2px solid var(--primary);
        background: rgba(66, 182, 240, 0.05);
        box-shadow: 0 20px 25px -5px rgba(66, 182, 240, 0.1);
        
        .skill-name {
          font-weight: 900;
          font-size: 1rem;
        }

        .skill-icon {
          width: 56px;
          height: 56px;
          background: var(--primary) !important;
          color: white !important;
          
          .material-symbols-outlined {
            font-size: 2.25rem;
          }
        }
      }
    }

    .years-badge {
      position: absolute;
      top: 0;
      right: 0;
      background: var(--primary);
      color: white;
      font-size: 0.625rem;
      font-weight: 800;
      padding: 0.25rem 0.5rem;
      border-bottom-left-radius: 0.75rem;
    }

    .skill-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);

      .material-symbols-outlined {
        font-size: 1.875rem;
      }
    }

    .skill-name {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--text-main);
    }
  `]
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', icon: 'change_history', color: '#dd0031', bgColor: '#fef2f2' },
    { name: 'Firebase', icon: 'local_fire_department', color: '#ffca28', bgColor: '#fffbeb' },
    { name: 'TypeScript', icon: 'javascript', color: '#42b6f0', bgColor: '#f0f9ff', featured: true },
    { name: 'Tailwind', icon: 'palette', color: '#06b6d4', bgColor: '#ecfeff' },
    { name: 'Cypress/QA', icon: 'fact_check', color: '#7c3aed', bgColor: '#f5f3ff' },
    { name: 'Git', icon: 'history', color: '#ea580c', bgColor: '#fff7ed' }
  ];
}
