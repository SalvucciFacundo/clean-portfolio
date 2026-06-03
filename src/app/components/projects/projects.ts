import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbService, Project } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { AdminModalComponent } from '../admin-modal/admin-modal';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, AdminModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects-header">
          <div class="header-with-action">
            <h3 class="title">Featured Projects</h3>
            @if (isLoggedIn()) {
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <button class="btn-admin-action" (click)="openAddModal()">
                  <span class="material-symbols-outlined">add</span> Add Project
                </button>
                <button class="btn-admin-action" (click)="seedDatabase()" style="border-style: dotted; background: rgba(34, 197, 94, 0.08); border-color: #22c55e; color: #22c55e;">
                  <span class="material-symbols-outlined">database</span> Migrar Datos a Firestore
                </button>
              </div>
            }
          </div>
          <p class="header-desc">
            Explore my latest web applications, AI experiments, and UI concepts.
          </p>
        </div>

        @if (projects().length > 0) {
          <div class="showcase-container">
            <!-- Main Selected Project Detail (Showcase Display) -->
            @if (selectedProject()) {
              <div class="showcase-display">
                <div class="display-image-container">
                  <img [src]="selectedProject()!.image" [alt]="selectedProject()!.title" class="display-image" />
                  <div class="image-overlay">
                    <span class="category-tag">{{ selectedProject()!.category }}</span>
                    @if (selectedProject()!.statusLabel) {
                      <span
                        class="status-tag"
                        [class.production]="selectedProject()!.statusLabel === 'Production'"
                      >
                        {{ selectedProject()!.statusLabel }}
                      </span>
                    }
                  </div>
                </div>
                
                <div class="display-content">
                  <div>
                    <div class="title-with-edit">
                      <h4 class="display-title">{{ selectedProject()!.title }}</h4>
                      @if (isLoggedIn()) {
                        <button class="btn-icon-edit" (click)="openEditModal(selectedProject()!)" title="Edit Project">
                          <span class="material-symbols-outlined">edit</span>
                        </button>
                      }
                    </div>
                    <p class="display-description">{{ selectedProject()!.description }}</p>
                  </div>
                  
                  <div>
                    <div class="display-tags">
                      @for (tag of selectedProject()!.tags; track tag) {
                        <span class="tag">{{ tag }}</span>
                      }
                    </div>
                    
                    <div class="display-actions">
                      @if (selectedProject()!.link) {
                        <a [href]="selectedProject()!.link" target="_blank" class="btn-showcase primary">
                          Live Demo
                          <span class="material-symbols-outlined">north_east</span>
                        </a>
                      }
                      @if (selectedProject()!.repoLink) {
                        <a [href]="selectedProject()!.repoLink" target="_blank" class="btn-showcase secondary">
                          View Code
                          <span class="material-symbols-outlined">terminal</span>
                        </a>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- Thumbnail Sidebar/Carousel -->
            <div class="showcase-thumbnails-wrapper">
              <div class="thumbnails-header">
                <span class="thumbnails-title">Select a Project</span>
                <span class="thumbnails-count">{{ projects().length }} projects</span>
              </div>
              
              <div class="showcase-thumbnails">
                @for (project of projects(); track project.title) {
                  <button 
                    class="thumbnail-card" 
                    [class.active]="selectedProject()?.title === project.title"
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
        }
      </div>

      <!-- Add/Edit Project Modal -->
      @if (isModalOpen()) {
        <app-admin-modal 
          type="project" 
          [projectData]="editingProject()"
          (close)="closeModal()"
        />
      }
    </section>
  `,
  styleUrl: './projects.scss',
})
export class ProjectsComponent {
  private dbService = inject(DbService);
  private authService = inject(AuthService);

  projects = signal<Project[]>([]);
  selectedProject = signal<Project | null>(null);

  isModalOpen = signal(false);
  editingProject = signal<Project | undefined>(undefined);

  MOCK_PROJECTS: Project[] = [
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

  constructor() {
    this.dbService.getProjects().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.projects.set(data);
        } else {
          this.projects.set(this.MOCK_PROJECTS);
        }
        
        // Select project
        const current = this.selectedProject();
        if (!current || !this.projects().some((p) => p.title === current.title)) {
          this.selectedProject.set(this.projects()[0] || null);
        }
      },
      error: () => {
        // Fallback on error (like offline / SSR without connections)
        this.projects.set(this.MOCK_PROJECTS);
        if (!this.selectedProject()) {
          this.selectedProject.set(this.MOCK_PROJECTS[0]);
        }
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  selectProject(project: Project): void {
    this.selectedProject.set(project);
  }

  openAddModal() {
    this.editingProject.set(undefined);
    this.isModalOpen.set(true);
  }

  openEditModal(project: Project) {
    this.editingProject.set(project);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  async seedDatabase() {
    if (!confirm('¿Querés subir toda la información de respaldo (proyectos y habilidades) a Firestore?')) return;
    try {
      // Seed Projects
      for (const project of this.MOCK_PROJECTS) {
        await this.dbService.addProject(project);
      }
      
      const mockSkills = [
        {
          name: 'Angular',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg',
          color: '#dd0031',
          bgColor: '#fef2f2',
        },
        {
          name: 'Firebase',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
          color: '#ffca28',
          bgColor: '#fffbeb',
        },
        {
          name: 'TypeScript',
          imgUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
          color: '#007acc',
          bgColor: '#f0f9ff',
        },
        {
          name: 'JavaScript',
          imgUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          color: '#F7DF1E',
          bgColor: '#fffbeb',
        },
        {
          name: 'SCSS',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
          color: '#bf4080',
          bgColor: '#fdf2f8',
        },
        {
          name: 'Java',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          color: '#007396',
          bgColor: '#e6f3f7',
        },
        {
          name: 'Postman',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
          color: '#FF6C37',
          bgColor: '#fff1ec',
        },
        {
          name: 'GitHub',
          imgUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
          color: '#ea580c',
          bgColor: '#fff7ed',
        },
      ];
      // Seed Skills
      for (const skill of mockSkills) {
        await this.dbService.addSkill(skill);
      }
      alert('¡Toda la información fue migrada a Firestore con éxito!');
    } catch (e: any) {
      alert('Error al migrar los datos: ' + e.message);
    }
  }
}
