import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-education',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="education" id="education">
      <div class="container">
        <div class="education-header">
          <h2 class="subtitle">Academic Foundation</h2>
          <h3 class="title">Education</h3>
        </div>

        <div class="education-grid">
          @for (edu of education; track edu.title) {
            <div class="education-card">
              <div class="card-header">
                <span class="material-symbols-outlined emoji">school</span>
                <span class="period">{{ edu.date }}</span>
              </div>
              <h4 class="degree">{{ edu.title }}</h4>
              <p class="school">{{ edu.school }}</p>
              <p class="description">{{ edu.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './education.scss',
})
export class EducationComponent {
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
