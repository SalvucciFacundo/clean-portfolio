import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link?: string;
  repoLink?: string;
  statusLabel?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects-header">
          <h3 class="title">Featured Projects</h3>
          <p class="header-desc">
            Explore my latest web applications, AI experiments, and UI concepts.
          </p>
        </div>

        <div class="showcase-container">
          <!-- Main Selected Project Detail (Showcase Display) -->
          <div class="showcase-display">
            <div class="display-image-container">
              <img [src]="selectedProject().image" [alt]="selectedProject().title" class="display-image" />
              <div class="image-overlay">
                <span class="category-tag">{{ selectedProject().category }}</span>
                @if (selectedProject().statusLabel) {
                  <span
                    class="status-tag"
                    [class.production]="selectedProject().statusLabel === 'Production'"
                  >
                    {{ selectedProject().statusLabel }}
                  </span>
                }
              </div>
            </div>
            
            <div class="display-content">
              <h4 class="display-title">{{ selectedProject().title }}</h4>
              <p class="display-description">{{ selectedProject().description }}</p>
              
              <div class="display-tags">
                @for (tag of selectedProject().tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
              
              <div class="display-actions">
                @if (selectedProject().link) {
                  <a [href]="selectedProject().link" target="_blank" class="btn-showcase primary">
                    Live Demo
                    <span class="material-symbols-outlined">north_east</span>
                  </a>
                }
                @if (selectedProject().repoLink) {
                  <a [href]="selectedProject().repoLink" target="_blank" class="btn-showcase secondary">
                    View Code
                    <span class="material-symbols-outlined">terminal</span>
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Thumbnail Sidebar/Carousel -->
          <div class="showcase-thumbnails-wrapper">
            <div class="thumbnails-header">
              <span class="thumbnails-title">Select a Project</span>
              <span class="thumbnails-count">{{ projects.length }} projects</span>
            </div>
            
            <div class="showcase-thumbnails">
              @for (project of projects; track project.title) {
                <button 
                  class="thumbnail-card" 
                  [class.active]="selectedProject().title === project.title"
                  (click)="selectProject(project)"
                >
                  <div class="thumbnail-img">
                    <img [src]="project.image" [alt]="project.title" loading="lazy" />
                  </div>
                  <div class="thumbnail-info">
                    <span class="thumbnail-cat">{{ project.category }}</span>
                    <h5 class="thumbnail-title">{{ project.title }}</h5>
                  </div>
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Mis Canarios',
      description:
        'Comprehensive management system for canary breeders. Includes pedigree tracking, breeding records, and health cycles. (Production Ready)',
      image: 'assets/mis-canarios.png',
      category: 'Full-Stack',
      statusLabel: 'Production',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://miscanarios.com.ar',
      repoLink: 'https://github.com/SalvucciFacundo/Mis-Canarios-A-F',
    },
    {
      title: 'Mendoza Shop Web',
      description:
        'Local marketplace platform for businesses in Mendoza, featuring specialized vendor dashboard and inventory management.',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      category: 'Development',
      statusLabel: 'In Progress',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://mendoza-shop.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/Mendoza-Shop-Web',
    },
    {
      title: 'Novel Editor AI',
      description:
        'A professional writing environment for light novel authors with integrated AI assistance and story structure analysis.',
      image:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
      category: 'Web App',
      tags: ['Angular', 'Firebase', 'OpenAI'],
      link: 'https://web-novel-16cd7.web.app',
      repoLink: 'https://github.com/SalvucciFacundo/novel-editor',
    },
    {
      title: 'IDE Style Portfolio',
      description:
        'A unique developer portfolio featuring a VS Code interface design. Built as a sample to showcase creative interface engineering.',
      image:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
      category: 'UI Concept',
      tags: ['Angular', 'CSS Grid', 'Theming'],
      link: 'https://portafolio-f6f99.web.app',
      repoLink: 'https://github.com/SalvucciFacundo/Portfolio',
    },
    {
      title: 'Sector Remeras',
      description:
        'Custom t-shirt shop with a dynamic product gallery, administrative panel, and a streamlined ordering process.',
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      category: 'E-commerce',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://sector-remeras.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/sector-remeras',
    },
    {
      title: 'Tecno Shop',
      description:
        'Modern electronics store focusing on user experience, featuring advanced search filters and a robust shopping cart.',
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      category: 'E-commerce',
      tags: ['Angular', 'Firebase'],
      link: 'https://tecno-shop-ba780.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/tecno-shop',
    },
    {
      title: 'Dólar Hoy Arg',
      description:
        'Financial dashboard providing real-time data on currency exchange rates and virtual wallet investment yields.',
      image:
        'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800',
      category: 'Dashboard',
      tags: ['Angular', 'Financial API', 'Tailwind'],
      repoLink: 'https://github.com/SalvucciFacundo/dolar-hoy-arg',
    },
    {
      title: 'Clasificador IA',
      description:
        'Neural network project that classifies images as real or AI-generated, improving its accuracy over time.',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      category: 'AI / Machine Learning',
      tags: ['TensorFlow.js', 'Angular', 'Machine Learning'],
      repoLink: 'https://github.com/SalvucciFacundo/ClasificadorIA',
    },
    {
      title: 'IA Text Editor',
      description:
        'Intelligent writing tool with autocompletion and contextual style suggestions based on large language models.',
      image:
        'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800',
      category: 'AI / Productivity',
      tags: ['Angular', 'GPT API', 'Node.js'],
      repoLink: 'https://github.com/SalvucciFacundo/IA-TextEditor-WebNovel',
    },
  ];

  selectedProject = signal<Project>(this.projects[0]);

  selectProject(project: Project): void {
    this.selectedProject.set(project);
  }
}
