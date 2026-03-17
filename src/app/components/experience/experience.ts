import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="experience" id="experience">
      <div class="container">
        <div class="experience-header">
          <h2 class="subtitle">My Journey</h2>
          <h3 class="title">Professional Experience</h3>
        </div>

        <div class="experience-timeline">
          @for (exp of experience; track exp.id) {
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                <div class="marker-line"></div>
              </div>
              <div class="timeline-content">
                <div class="header-row">
                  <span class="period">{{ exp.period }}</span>
                  <h4 class="role">{{ exp.position }}</h4>
                </div>
                <div class="company-row">
                  <span class="material-symbols-outlined emoji">work</span>
                  <p class="company">{{ exp.company }}</p>
                </div>
                <div class="desc" [innerHTML]="exp.description"></div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './experience.scss',
})
export class ExperienceComponent {
  experience = [
    {
      id: "exp1",
      company: "Freelance",
      position: "Full-Stack Developer",
      period: "2023 - Present",
      description: "<ul><li>Designed and developed scalable web applications using Angular and TypeScript.</li><li>Integrated Firebase services for real-time database management, user authentication, and cloud hosting.</li><li>Engineered custom business solutions, including specialized marketplace and inventory systems.</li></ul>"
    },
    {
      id: "exp2",
      company: "Dubbz",
      position: "QA Tester",
      period: "2023 - 2025",
      description: "<ul><li>Performed comprehensive manual and exploratory testing to identify and document software bugs.</li><li>Collaborated with dev teams to ensure software quality and adherence to technical requirements.</li><li>Executed end-to-end testing protocols to validate system stability.</li></ul>"
    },
    {
      id: "exp3",
      company: "Dubbz",
      position: "Customer Support Specialist",
      period: "2023 - 2025",
      description: "<ul><li>Documented technical procedures and user feedback to assist developers in prioritizing feature updates.</li><li>Managed complex client inquiries and resolved service-level issues in a fast-paced environment.</li></ul>"
    }
  ];
}
