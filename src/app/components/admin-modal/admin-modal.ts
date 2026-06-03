import { Component, ChangeDetectionStrategy, signal, inject, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DbService, Project, Skill } from '../../services/db.service';

export type AdminModalType = 'login' | 'project' | 'skill';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="close.emit()">
          <span class="material-symbols-outlined">close</span>
        </button>

        <!-- LOGIN MODE -->
        @if (type === 'login') {
          <h4 class="modal-title">Admin Access</h4>
          <p class="modal-subtitle">Log in to manage your portfolio</p>
          
          <form (submit)="handleLogin($event)" class="modal-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" [(ngModel)]="email" name="email" required placeholder="admin@example.com" />
            </div>
            
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" [(ngModel)]="password" name="password" required placeholder="••••••••" />
            </div>
            
            @if (error()) {
              <div class="error-msg">{{ error() }}</div>
            }
            
            <button type="submit" class="btn btn-primary form-submit" [disabled]="loading()">
              {{ loading() ? 'Logging in...' : 'Login' }}
            </button>
          </form>
        }

        <!-- PROJECT FORM MODE -->
        @if (type === 'project') {
          <h4 class="modal-title">{{ projectData ? 'Edit Project' : 'Add Project' }}</h4>
          <p class="modal-subtitle">Fill in the project details</p>
          
          <form (submit)="handleProjectSubmit($event)" class="modal-form scrollable-form">
            <div class="form-group">
              <label for="p-title">Title *</label>
              <input type="text" id="p-title" [(ngModel)]="projectForm.title" name="title" required placeholder="e.g. My Awesome App" />
            </div>
            
            <div class="form-group">
              <label for="p-desc">Description *</label>
              <textarea id="p-desc" [(ngModel)]="projectForm.description" name="description" required placeholder="Short summary..." rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="p-image">Image URL / Path *</label>
              <input type="text" id="p-image" [(ngModel)]="projectForm.image" name="image" required placeholder="assets/project.png or https://..." />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="p-category">Category *</label>
                <input type="text" id="p-category" [(ngModel)]="projectForm.category" name="category" required placeholder="e.g. Full-Stack" />
              </div>
              <div class="form-group">
                <label for="p-status">Status (Optional)</label>
                <input type="text" id="p-status" [(ngModel)]="projectForm.statusLabel" name="statusLabel" placeholder="e.g. Production or In Progress" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="p-tags">Tags * (comma separated)</label>
              <input type="text" id="p-tags" [(ngModel)]="tagsString" name="tags" required placeholder="Angular, Firebase, Tailwind" />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="p-link">Live Demo Link</label>
                <input type="url" id="p-link" [(ngModel)]="projectForm.link" name="link" placeholder="https://..." />
              </div>
              <div class="form-group">
                <label for="p-repo">Repository Link</label>
                <input type="url" id="p-repo" [(ngModel)]="projectForm.repoLink" name="repoLink" placeholder="https://github.com/..." />
              </div>
            </div>
            
            @if (error()) {
              <div class="error-msg">{{ error() }}</div>
            }
            
            <div class="form-actions">
              @if (projectData?.id) {
                <button type="button" class="btn btn-danger" (click)="deleteProject()" [disabled]="loading()">
                  Delete
                </button>
              }
              <button type="submit" class="btn btn-primary" [disabled]="loading()">
                {{ loading() ? 'Saving...' : 'Save Project' }}
              </button>
            </div>
          </form>
        }

        <!-- SKILL FORM MODE -->
        @if (type === 'skill') {
          <h4 class="modal-title">{{ skillData ? 'Edit Skill' : 'Add Skill' }}</h4>
          <p class="modal-subtitle">Fill in the technology details</p>
          
          <form (submit)="handleSkillSubmit($event)" class="modal-form">
            <div class="form-group">
              <label for="s-name">Skill Name *</label>
              <input type="text" id="s-name" [(ngModel)]="skillForm.name" name="name" required placeholder="e.g. TypeScript" />
            </div>
            
            <div class="form-group">
              <label for="s-img">Devicon Image SVG URL (or Material Icon Name) *</label>
              <input type="text" id="s-img" [(ngModel)]="skillForm.imgUrl" name="imgUrl" placeholder="https://cdn.jsdelivr.net/gh/devicons/..." />
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="s-color">Brand Color Hex *</label>
                <input type="text" id="s-color" [(ngModel)]="skillForm.color" name="color" required placeholder="e.g. #007acc" />
              </div>
              <div class="form-group">
                <label for="s-bg">Bg Light Color Hex *</label>
                <input type="text" id="s-bg" [(ngModel)]="skillForm.bgColor" name="bgColor" required placeholder="e.g. #f0f9ff" />
              </div>
            </div>
            
            <div class="form-checkbox">
              <input type="checkbox" id="s-featured" [(ngModel)]="skillForm.featured" name="featured" />
              <label for="s-featured">Featured Skill (Highlight in list)</label>
            </div>
            
            @if (error()) {
              <div class="error-msg">{{ error() }}</div>
            }
            
            <div class="form-actions">
              @if (skillData?.id) {
                <button type="button" class="btn btn-danger" (click)="deleteSkill()" [disabled]="loading()">
                  Delete
                </button>
              }
              <button type="submit" class="btn btn-primary" [disabled]="loading()">
                {{ loading() ? 'Saving...' : 'Save Skill' }}
              </button>
            </div>
          </form>
        }
      </div>
    </div>
  `,
  styleUrl: './admin-modal.scss',
})
export class AdminModalComponent {
  @Input() type: AdminModalType = 'login';
  @Input() projectData?: Project;
  @Input() skillData?: Skill;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  private authService = inject(AuthService);
  private dbService = inject(DbService);

  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  // Project Form Model
  projectForm: Partial<Project> = {
    title: '',
    description: '',
    image: '',
    category: '',
    tags: [],
    link: '',
    repoLink: '',
    statusLabel: '',
  };
  tagsString = '';

  // Skill Form Model
  skillForm: Partial<Skill> = {
    name: '',
    imgUrl: '',
    color: '',
    bgColor: '',
    featured: false,
  };

  ngOnInit() {
    if (this.projectData) {
      this.projectForm = { ...this.projectData };
      this.tagsString = this.projectData.tags ? this.projectData.tags.join(', ') : '';
    }
    if (this.skillData) {
      this.skillForm = { ...this.skillData };
    }
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.authService.login(this.email, this.password);
      this.success.emit();
      this.close.emit();
    } catch (e: any) {
      this.error.set(e.message || 'Login failed. Please check your credentials.');
    } finally {
      this.loading.set(false);
    }
  }

  async handleProjectSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);

    // Parse tags
    this.projectForm.tags = this.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => !!t);

    try {
      if (this.projectData?.id) {
        await this.dbService.updateProject(this.projectData.id, this.projectForm);
      } else {
        await this.dbService.addProject(this.projectForm as Project);
      }
      this.success.emit();
      this.close.emit();
    } catch (e: any) {
      this.error.set(e.message || 'Error saving project.');
    } finally {
      this.loading.set(false);
    }
  }

  async deleteProject() {
    if (!this.projectData?.id || !confirm('Are you sure you want to delete this project?')) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.dbService.deleteProject(this.projectData.id);
      this.success.emit();
      this.close.emit();
    } catch (e: any) {
      this.error.set(e.message || 'Error deleting project.');
    } finally {
      this.loading.set(false);
    }
  }

  async handleSkillSubmit(event: Event) {
    event.preventDefault();
    this.loading.set(true);
    this.error.set(null);

    try {
      if (this.skillData?.id) {
        await this.dbService.updateSkill(this.skillData.id, this.skillForm);
      } else {
        await this.dbService.addSkill(this.skillForm as Skill);
      }
      this.success.emit();
      this.close.emit();
    } catch (e: any) {
      this.error.set(e.message || 'Error saving skill.');
    } finally {
      this.loading.set(false);
    }
  }

  async deleteSkill() {
    if (!this.skillData?.id || !confirm('Are you sure you want to delete this skill?')) return;
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.dbService.deleteSkill(this.skillData.id);
      this.success.emit();
      this.close.emit();
    } catch (e: any) {
      this.error.set(e.message || 'Error deleting skill.');
    } finally {
      this.loading.set(false);
    }
  }
}
