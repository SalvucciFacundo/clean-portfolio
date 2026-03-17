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
              Professional Experience
            </h4>
            <div class="timeline">
              @for (exp of experience; track exp.title) {
                <div class="timeline-item">
                  <div class="timeline-content">
                    <span class="period">{{ exp.date }}</span>
                    <h5 class="role">{{ exp.title }}</h5>
                    <p class="company">{{ exp.company }}</p>
                    <p class="desc">{{ exp.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Education Column -->
          <div class="column">
            <h4 class="column-title">
              <span class="material-symbols-outlined emoji">school</span>
              Academic Foundation
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
        </div>
      </div>
    </section>
  `,
  styleUrl: './education.scss',
})
export class EducationComponent {
  experience = [
    {
      title: 'Full-Stack Developer',
      company: 'Freelance',
      date: '2023 - Present',
      description: 'Designed and developed scalable web applications using Angular and TypeScript. Integrated Firebase services for real-time management and hosting.'
    },
    {
      title: 'QA Tester',
      company: 'Dubbz',
      date: '2023 - 2025',
      description: 'Performed manual and exploratory testing to identify bugs. Collaborated with dev teams to ensure software quality and stable protocols.'
    },
    {
      title: 'Customer Support Specialist',
      company: 'Dubbz',
      date: '2023 - 2025',
      description: 'Documented technical procedures and user feedback to prioritize updates and bug fixes within a digital-first environment.'
    }
  ];

  education = [
    {
      title: 'Associate Degree in Computer Programming',
      school: 'Universidad Tecnológica Nacional (UTN)',
      date: '2019 - 2021',
      description: 'Focused on application development using modern frameworks and standard programming principles.'
    },
    {
      title: 'Industrial Mechanical Technician',
      school: 'Escuela Técnico Emilio Civit',
      date: '2012 - 2018',
      description: 'Technical high school diploma with a focus on engineering principles and industrial processes.'
    }
  ];
}
