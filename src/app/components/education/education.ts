import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  template: `
    <section id="education" class="education">
      <div class="container education-grid">
        <div class="edu-section">
          <span class="sub">Academic path</span>
          <h2>Education</h2>
          <div class="list">
            @for (edu of education(); track edu.degree) {
              <div class="item card">
                <h3>{{ edu.degree }}</h3>
                <p class="institution">{{ edu.institution }}</p>
                <p class="year">{{ edu.year }}</p>
              </div>
            }
          </div>
        </div>
        <div class="cert-section">
          <span class="sub">Continuous learning</span>
          <h2>Certifications</h2>
          <div class="list">
            @for (cert of certifications(); track cert.name) {
              <div class="item card">
                <h3>{{ cert.name }}</h3>
                <p class="issuer">{{ cert.issuer }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .education {
      background-color: var(--bg-alt);
    }
    .education-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
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
      margin-bottom: 2.5rem;
    }
    .list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      transition: var(--transition);
      &:hover {
        border-color: var(--primary);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }
      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      p {
        color: var(--text-muted);
        font-size: 0.9375rem;
      }
      .institution, .issuer {
        font-weight: 500;
        color: var(--text-main);
      }
    }
    @media (max-width: 768px) {
      .education-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Education {
  protected readonly education = signal([
    { degree: 'Associate Degree in Computer Science', institution: 'UTN FRGP', year: '2022 - 2024' },
    { degree: 'Professional Web Development', institution: 'MIT OpenCourseWare', year: '2023' }
  ]);

  protected readonly certifications = signal([
    { name: 'Angular Advanced Patterns', issuer: 'Google Developers' },
    { name: 'Firebase Security Specialist', issuer: 'Firebase Academy' },
    { name: 'Manual & Automated Testing', issuer: 'QA Professionals' }
  ]);
}
