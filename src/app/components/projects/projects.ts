import { ChangeDetectionStrategy, Component, viewChild, ElementRef } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects-header">
          <h2 class="subtitle">My Portfolio</h2>
          <h3 class="title">Featured Projects</h3>
          <p class="header-desc">A collection of web applications, AI experiments, and specialized solutions.</p>
        </div>

        <div class="projects-slider-wrapper">
          <button class="nav-btn prev" (click)="scroll('left')" aria-label="Previous project">
            <span class="material-symbols-outlined">chevron_left</span>
          </button>

          <div class="projects-slider" #slider>
            @for (project of projects; track project.title) {
              <div class="project-card">
                <div class="project-image">
                  <img [src]="project.image" [alt]="project.title" loading="lazy">
                  <div class="project-overlay">
                    <span class="category-tag">{{ project.category }}</span>
                    @if (project.statusLabel) {
                      <span class="status-tag" [class.production]="project.statusLabel === 'Production'">
                        {{ project.statusLabel }}
                      </span>
                    }
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
                  <div class="project-actions">
                    @if (project.link) {
                      <a [href]="project.link" target="_blank" class="project-link">
                        Live Demo
                        <span class="material-symbols-outlined">north_east</span>
                      </a>
                    }
                    @if (project.repoLink) {
                      <a [href]="project.repoLink" target="_blank" class="project-link repo">
                        GitHub
                        <span class="material-symbols-outlined">terminal</span>
                      </a>
                    }
                  </div>
                </div>
              </div>
            }
          </div>

          <button class="nav-btn next" (click)="scroll('right')" aria-label="Next project">
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
          
          <div class="slider-hint">
            <span class="material-symbols-outlined">swipe</span>
            Scroll horizontally to see more
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  slider = viewChild<ElementRef<HTMLDivElement>>('slider');

  projects: Project[] = [
    {
      title: 'Mis Canarios',
      description: 'Comprehensive management system for canary breeders. Includes pedigree tracking, breeding records, and health cycles. (Production Ready)',
      image: 'assets/mis-canarios.png',
      category: 'Full-Stack',
      statusLabel: 'Production',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://miscanarios.com.ar',
      repoLink: 'https://github.com/SalvucciFacundo/Mis-Canarios-A-F'
    },
    {
      title: 'Mendoza Shop Web',
      description: 'Local marketplace platform for businesses in Mendoza, featuring specialized vendor dashboard and inventory management.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      category: 'Development',
      statusLabel: 'In Progress',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://mendoza-shop.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/Mendoza-Shop-Web'
    },
    {
      title: 'Novel Editor AI',
      description: 'A professional writing environment for light novel authors with integrated AI assistance and story structure analysis.',
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
      category: 'Web App',
      tags: ['Angular', 'Firebase', 'OpenAI'],
      link: 'https://web-novel-16cd7.web.app',
      repoLink: 'https://github.com/SalvucciFacundo/novel-editor'
    },
    {
      title: 'IDE Style Portfolio',
      description: 'A unique developer portfolio featuring a VS Code interface design. Built as a sample to showcase creative interface engineering.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
      category: 'UI Concept',
      tags: ['Angular', 'CSS Grid', 'Theming'],
      link: 'https://portafolio-f6f99.web.app',
      repoLink: 'https://github.com/SalvucciFacundo/Portfolio'
    },
    {
      title: 'Sector Remeras',
      description: 'Custom t-shirt shop with a dynamic product gallery, administrative panel, and a streamlined ordering process.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      category: 'E-commerce',
      tags: ['Angular', 'Firebase', 'Tailwind'],
      link: 'https://sector-remeras.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/sector-remeras'
    },
    {
      title: 'Tecno Shop',
      description: 'Modern electronics store focusing on user experience, featuring advanced search filters and a robust shopping cart.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
      category: 'E-commerce',
      tags: ['Angular', 'Firebase'],
      link: 'https://tecno-shop-ba780.web.app/',
      repoLink: 'https://github.com/SalvucciFacundo/tecno-shop'
    },
    {
      title: 'Dólar Hoy Arg',
      description: 'Financial dashboard providing real-time data on currency exchange rates and virtual wallet investment yields.',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&q=80&w=800',
      category: 'Dashboard',
      tags: ['Angular', 'Financial API', 'Tailwind'],
      repoLink: 'https://github.com/SalvucciFacundo/dolar-hoy-arg'
    },
    {
      title: 'Clasificador IA',
      description: 'Neural network project that classifies images as real or AI-generated, improving its accuracy over time.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
      category: 'AI / Machine Learning',
      tags: ['TensorFlow.js', 'Angular', 'Machine Learning'],
      repoLink: 'https://github.com/SalvucciFacundo/ClasificadorIA'
    },
    {
      title: 'IA Text Editor',
      description: 'Intelligent writing tool with autocompletion and contextual style suggestions based on large language models.',
      image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800',
      category: 'AI / Productivity',
      tags: ['Angular', 'GPT API', 'Node.js'],
      repoLink: 'https://github.com/SalvucciFacundo/IA-TextEditor-WebNovel'
    }
  ];

  scroll(direction: 'left' | 'right') {
    const sliderEl = this.slider()?.nativeElement;
    if (!sliderEl) return;

    const scrollAmount = 412; // Ancho card (380) + gap (32)
    const newScrollPosition = direction === 'left' 
      ? sliderEl.scrollLeft - scrollAmount 
      : sliderEl.scrollLeft + scrollAmount;

    sliderEl.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  }
}
