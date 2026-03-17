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
  styles: [`
    .projects {
      background-color: var(--bg-light);
      padding: 8rem 0;
    }

    .projects-header {
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

      @media (max-width: 640px) {
        font-size: 2.25rem;
      }
    }

    .projects-grid {
      display: grid;
      grid-template-cols: repeat(auto-fit, minmax(350px, 1fr));
      gap: 3rem;

      @media (max-width: 640px) {
        grid-template-cols: 1fr;
      }
    }

    .project-card {
      background: white;
      border-radius: 2rem;
      overflow: hidden;
      border: 1px solid rgba(226, 232, 240, 0.6);
      transition: var(--transition);

      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.1);
        border-color: var(--primary);

        .project-image img {
          transform: scale(1.05);
        }
      }
    }

    .project-image {
      position: relative;
      height: 240px;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }
    }

    .project-overlay {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
    }

    .category-tag {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(8px);
      padding: 0.5rem 1rem;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .project-info {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .project-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .project-description {
      color: var(--text-muted);
      line-height: 1.6;
      font-size: 1rem;
    }

    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .tag {
      background: #f1f5f9;
      color: #64748b;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      color: var(--primary);
      font-weight: 800;
      text-decoration: none;
      font-size: 0.875rem;
      transition: gap 0.3s ease;

      &:hover {
        gap: 0.75rem;
      }

      .material-symbols-outlined {
        font-size: 1.25rem;
      }
    }
  `]
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
      tags: ['Angular', 'Tailwind'],
      link: '#'
    }
  ];
}
