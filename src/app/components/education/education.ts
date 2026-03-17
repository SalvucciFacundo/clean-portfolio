import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="education" id="education">
      <div class="container">
        <div class="education-header">
          <h2 class="subtitle">Path to Excellence</h2>
          <h3 class="title">Experience & Education</h3>
        </div>

        <div class="education-grid">
          <!-- Experience Column -->
          <div class="column">
            <h4 class="column-title">
              <span class="material-symbols-outlined emoji">work</span>
              Experience
            </h4>
            <div class="timeline">
              @for (exp of experience; track exp.title) {
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="date">{{ exp.date }}</span>
                    <h5 class="item-title">{{ exp.title }}</h5>
                    <p class="organization">{{ exp.company }}</p>
                    <p class="description">{{ exp.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education Column -->
          <div class="column">
            <h4 class="column-title">
              <span class="material-symbols-outlined emoji">school</span>
              Education
            </h4>
            <div class="timeline">
              @for (edu of education; track edu.title) {
                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <span class="date">{{ edu.date }}</span>
                    <h5 class="item-title">{{ edu.title }}</h5>
                    <p class="organization">{{ edu.school }}</p>
                    <p class="description">{{ edu.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .education {
      background-color: white;
      padding: 8rem 0;
    }

    .education-header {
      text-align: center;
      margin-bottom: 5rem;
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
      font-size: 3rem;
      font-weight: 900;
      color: var(--text-main);
    }

    .education-grid {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 4rem;

      @media (max-width: 1024px) {
        grid-template-cols: 1fr;
        gap: 6rem;
      }
    }

    .column-title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 3rem;

      .emoji {
        color: var(--primary);
        font-size: 2rem;
      }
    }

    .timeline {
      position: relative;
      border-left: 2px dashed #e2e8f0;
      padding-left: 2.5rem;
      margin-left: 0.75rem;
    }

    .timeline-item {
      position: relative;
      margin-bottom: 3.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .timeline-dot {
      position: absolute;
      left: calc(-2.5rem - 6px);
      top: 0.5rem;
      width: 10px;
      height: 10px;
      background: var(--primary);
      border-radius: 50%;
      box-shadow: 0 0 0 4px rgba(66, 182, 240, 0.2);
    }

    .date {
      display: inline-block;
      font-size: 0.875rem;
      font-weight: 800;
      color: var(--primary);
      background: rgba(66, 182, 240, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 100px;
      margin-bottom: 1rem;
    }

    .item-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    .organization {
      font-weight: 700;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }

    .description {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 0.9375rem;
    }
  `]
})
export class EducationComponent {
  experience = [
    {
      title: 'Senior QA Analyst',
      company: 'Tech Solutions Inc.',
      date: '2022 - Present',
      description: 'Leading QA processes, implementing automated testing suites, and ensuring high-quality software delivery.'
    },
    {
      title: 'Full-Stack Developer',
      company: 'Frontend Masters',
      date: '2020 - 2022',
      description: 'Developed and maintained large-scale Angular applications with Firebase backend integration.'
    }
  ];

  education = [
    {
      title: 'B.Sc. Software Engineering',
      school: 'University of Technology',
      date: '2016 - 2020',
      description: 'Focused on software architecture, algorithms, and distributed systems.'
    },
    {
      title: 'Advanced Angular Certification',
      school: 'Decoded Frontend',
      date: '2021',
      description: 'Intensive specialization in signals, state management, and enterprise patterns.'
    }
  ];
}
