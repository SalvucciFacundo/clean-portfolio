import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section id="projects" class="projects">
      <div class="container">
        <div class="section-header">
          <span class="sub">Portfolio</span>
          <div class="header-flex">
            <h2>Selected Projects</h2>
            <a href="#" class="view-all">View All Projects &nearrow;</a>
          </div>
        </div>
        <div class="projects-grid">
          @for (project of projects(); track project.title) {
            <div class="project-card">
              <div class="project-image">
                <img [ngSrc]="project.image" width="600" height="340" [alt]="project.title" />
              </div>
              <div class="project-info">
                <div class="tech-stack">
                  @for (tech of project.tech; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-links">
                  <a href="#" class="btn btn-primary btn-sm">Live Demo</a>
                  <a href="#" class="btn btn-outline btn-sm">View Code</a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .projects {
      background-color: var(--bg-main);
    }
    .section-header {
      margin-bottom: 4rem;
      .sub {
        color: var(--primary);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.875rem;
      }
      .header-flex {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      h2 {
        font-size: 2.5rem;
        font-weight: 800;
      }
      .view-all {
        font-weight: 600;
        color: var(--primary);
      }
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 3rem;
    }
    .project-card {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
      transition: var(--transition);
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }
      .project-image {
        position: relative;
        height: 250px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .project-info {
        padding: 2rem;
      }
      .tech-stack {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        .tech-tag {
          font-size: 0.75rem;
          background: var(--bg-alt);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: var(--text-muted);
          font-weight: 500;
        }
      }
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      p {
        color: var(--text-muted);
        margin-bottom: 2rem;
      }
      .project-links {
        display: flex;
        gap: 1rem;
      }
      .btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
    }
    @media (max-width: 640px) {
      .projects-grid { grid-template-columns: 1fr; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Projects {
  protected readonly projects = signal([
    {
      title: 'EcoAnalytics Pro',
      description: 'Real-time environmental monitoring dashboard with predictive analysis and IoT integration.',
      tech: ['Angular', 'Firebase', 'D3.js', 'Leaflet'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600'
    },
    {
      title: 'Velox Fintech SaaS',
      description: 'Streamlined payment processing and financial management platform for global enterprises.',
      tech: ['Angular', 'NestJS', 'PostgreSQL', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600'
    }
  ]);
}
