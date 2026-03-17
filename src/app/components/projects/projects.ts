import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects-header">
          <h2 class="subtitle">Selected Projects</h2>
          <h3 class="title">Featured Work</h3>
        </div>

        <div class="projects-grid">
          @for (project of projects; track project.title) {
            <div class="project-card">
              <div class="project-image">
                <img [src]="project.image" [alt]="project.title">
                <div class="project-overlay">
                  <span class="category-tag">{{ project.category }}</span>
                </div>
              </div>
              <div class="project-info">
                <h4 class="project-title">{{ project.title }}</h4>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tags">
                  @for (tag of project.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>
                <a [href]="project.link" class="project-link">
                  View Project
                  <span class="material-symbols-outlined">north_east</span>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured online store built with Angular and Firebase, featuring real-time inventory and Stripe integration.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
      category: 'Web App',
      tags: ['Angular', 'Firebase', 'Stripe'],
      link: '#'
    },
    {
      title: 'QA Automation Suite',
      description: 'End-to-end testing framework using Cypress and GitHub Actions to ensure continuous delivery quality.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
      category: 'DevOps / QA',
      tags: ['Cypress', 'TypeScript', 'CI/CD'],
      link: '#'
    },
    {
      title: 'DevFolio v1',
      description: 'My previous portfolio built with Angular 16, focusing on minimalist design and speed.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      category: 'Portfolio',
      tags: ['Angular', 'SCSS'],
      link: '#'
    }
  ];
}
