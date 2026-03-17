import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <section id="skills" class="skills">
      <div class="container">
        <div class="section-header">
          <span class="sub">Core Ecosystem</span>
          <h2>Tools I use to build</h2>
        </div>
        <div class="skills-grid">
          @for (skill of skills(); track skill.name) {
            <div class="skill-card">
              <div class="skill-icon">{{ skill.icon }}</div>
              <h3>{{ skill.name }}</h3>
              <p>{{ skill.level }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .skills {
      background-color: var(--bg-alt);
    }
    .section-header {
      text-align: center;
      margin-bottom: 4rem;
      .sub {
        color: var(--primary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
      }
      h2 {
        font-size: 2.5rem;
        font-weight: 800;
        color: var(--text-main);
      }
    }
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.5rem;
    }
    .skill-card {
      background: white;
      padding: 2rem;
      border-radius: var(--radius-md);
      text-align: center;
      transition: var(--transition);
      border: 1px solid var(--border-color);
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-color: var(--primary);
      }
      .skill-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      p {
        font-size: 0.875rem;
        color: var(--text-muted);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Skills {
  protected readonly skills = signal([
    { name: 'Angular', level: 'Expert', icon: '▲' },
    { name: 'Firebase', level: 'Expert', icon: '🔥' },
    { name: 'TypeScript', level: 'Advanced', icon: 'TS' },
    { name: 'Tailwind', level: 'Advanced', icon: '🎨' },
    { name: 'Cypress/QA', level: 'Expert', icon: '👁️' },
    { name: 'Git', level: 'Advanced', icon: '🌲' }
  ]);
}
