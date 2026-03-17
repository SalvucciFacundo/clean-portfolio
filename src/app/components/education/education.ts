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
          <h3 class="title">Education & Certifications</h3>
        </div>

        <div class="education-grid">
          <!-- Education Column -->
          <div class="column">
            <h4 class="column-title">
              <span class="material-symbols-outlined emoji">school</span>
              Education
            </h4>
            <div class="timeline">
              @for (edu of education; track edu.title) {
                <div class="timeline-item">
                  <div class="timeline-content">
                    <span class="period">{{ edu.date }}</span>
                    <h5 class="role">{{ edu.title }}</h5>
                    <p class="company">{{ edu.school }}</p>
                    <p class="desc">{{ edu.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Certifications Column -->
          <div class="column">
            <h4 class="column-title">
              <span class="material-symbols-outlined emoji">badge</span>
              Certifications
            </h4>
            <div class="certifications-grid">
              @for (cert of certifications; track cert.title) {
                <div class="cert-card">
                  <div class="cert-icon">
                    <span class="material-symbols-outlined">{{ cert.icon }}</span>
                  </div>
                  <div class="cert-info">
                    <h5 class="cert-title">{{ cert.title }}</h5>
                    <p class="cert-issuer">{{ cert.issuer }}</p>
                    <span class="cert-date">{{ cert.date }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './education.scss',
})
export class EducationComponent {
  education = [
    {
      title: 'B.Sc. Software Engineering',
      school: 'University of Technology',
      date: '2016 - 2020',
      description: 'Major degree focused on software architecture, algorithms, and distributed systems.'
    },
    {
      title: 'Associate Degree in Computer Programming',
      school: 'Tech Institute',
      date: '2014 - 2016',
      description: 'Foundational studies in procedural and object-oriented programming.'
    }
  ];

  certifications = [
    {
      title: 'Advanced Angular',
      issuer: 'Decoded Frontend',
      date: '2023',
      icon: 'verified'
    },
    {
      title: 'Firebase Expert',
      issuer: 'Google Cloud',
      date: '2022',
      icon: 'local_fire_department'
    },
    {
      title: 'Architecting with Google Cloud',
      issuer: 'Coursera',
      date: '2021',
      icon: 'cloud'
    },
    {
      title: 'Scrum Master',
      issuer: 'Scrum.org',
      date: '2021',
      icon: 'groups'
    }
  ];
}
