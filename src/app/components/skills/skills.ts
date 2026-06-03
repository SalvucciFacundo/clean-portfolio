import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbService, Skill } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { AdminModalComponent } from '../admin-modal/admin-modal';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, AdminModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="skills" id="skills">
      <div class="container">
        <div class="skills-header">
          <div class="header-with-action">
            <h3 class="title">Tools I use to build</h3>
            @if (isLoggedIn()) {
              <button class="btn-admin-action" (click)="openAddModal()">
                <span class="material-symbols-outlined">add</span> Add Skill
              </button>
            }
          </div>
        </div>

        <div class="skills-grid">
          @for (skill of skills(); track skill.name) {
            <div
              class="skill-card"
              [class.featured]="skill.featured"
              [style.--skill-color]="skill.color"
            >
              @if (isLoggedIn()) {
                <button class="btn-skill-edit" (click)="openEditModal(skill)" title="Edit Skill">
                  <span class="material-symbols-outlined">edit</span>
                </button>
              }
              
              <div class="skill-icon" [style.background-color]="skill.bgColor">
                @if (skill.imgUrl) {
                  <img [src]="skill.imgUrl" [alt]="skill.name" class="brand-icon" />
                } @else {
                  <span class="material-symbols-outlined" [style.color]="skill.color">{{
                    skill.icon || 'code'
                  }}</span>
                }
              </div>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          }
        </div>
      </div>

      <!-- Add/Edit Skill Modal -->
      @if (isModalOpen()) {
        <app-admin-modal 
          type="skill" 
          [skillData]="editingSkill()"
          (close)="closeModal()"
        />
      }
    </section>
  `,
  styleUrl: './skills.scss',
})
export class SkillsComponent {
  private dbService = inject(DbService);
  private authService = inject(AuthService);

  skills = signal<Skill[]>([]);
  isModalOpen = signal(false);
  editingSkill = signal<Skill | undefined>(undefined);

  MOCK_SKILLS: Skill[] = [
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

  constructor() {
    this.dbService.getSkills().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.skills.set(data);
        } else {
          this.skills.set(this.MOCK_SKILLS);
        }
      },
      error: () => {
        this.skills.set(this.MOCK_SKILLS);
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  openAddModal() {
    this.editingSkill.set(undefined);
    this.isModalOpen.set(true);
  }

  openEditModal(skill: Skill) {
    this.editingSkill.set(skill);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
