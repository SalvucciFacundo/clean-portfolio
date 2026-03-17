import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <section id="about" class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="badge">Available for new projects</span>
          <h1>Engineering robust digital solutions.</h1>
          <p>
            I'm a <strong>Full-Stack Developer & QA Specialist</strong> focused on
            building scalable web applications with <strong>Angular</strong> and robust
            <strong>Firebase</strong> architectures.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary">View My Work &rarr;</button>
            <button class="btn btn-outline">Get Resume &darr;</button>
          </div>
          <div class="qa-badges">
            <span class="qa-badge">Manual Testing</span>
            <span class="qa-badge">Automated QA</span>
            <span class="qa-badge">End-to-End Testing</span>
          </div>
        </div>
        <div class="hero-image">
          <div class="image-wrapper">
            <img ngSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600" width="400" height="400" alt="Profile" priority />
            <div class="floating-badge angular-badge">Angular 17+</div>
            <div class="floating-badge firebase-badge">Firebase Core</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: calc(100vh - 70px);
      display: flex;
      align-items: center;
      background-color: var(--bg-main);
    }
    .hero-content {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: #ebf5ff;
      color: #3b82f6;
      border-radius: var(--radius-lg);
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    h1 {
      font-size: 4rem;
      line-height: 1.1;
      font-weight: 800;
      margin-bottom: 1.5rem;
      color: var(--text-main);
    }
    p {
      font-size: 1.25rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      max-width: 500px;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 3rem;
    }
    .qa-badges {
      display: flex;
      gap: 1rem;
      .qa-badge {
        font-size: 0.875rem;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        &:before {
          content: '•';
          color: #ef4444;
          margin-right: 0.5rem;
          font-size: 1.5rem;
        }
      }
    }
    .hero-image {
      position: relative;
      .image-wrapper {
        position: relative;
        img {
          border-radius: var(--radius-md);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          object-fit: cover;
        }
      }
    }
    .floating-badge {
      position: absolute;
      background: white;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      font-weight: 600;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .angular-badge {
      top: 10%;
      right: -10%;
      &:before {
        content: '▲';
        color: #dd0031;
      }
    }
    .firebase-badge {
      bottom: 20%;
      right: -5%;
      &:before {
        content: '🔥';
      }
    }
    @media (max-width: 1024px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
      }
      .hero-text p { margin-left: auto; margin-right: auto; }
      .hero-actions { justify-content: center; }
      .qa-badges { justify-content: center; }
      h1 { font-size: 3rem; }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Hero {}
