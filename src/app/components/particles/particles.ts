import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  OnDestroy,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

@Component({
  selector: 'app-particles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas class="particles-canvas"></canvas>
  `,
  styleUrl: './particles.scss',
})
export class ParticlesComponent implements OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  private ctx!: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private mouse = { x: -1000, y: -1000, active: false };
  private particleCount = 60;
  private connectionDistance = 120;
  private mouseConnectionDistance = 180;

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only run code in the browser to support Server-Side Rendering (SSR)
    afterNextRender(() => {
      this.initParticles();
    });
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resizeCanvas();
    this.createParticles();

    // Run animation outside Angular Zone to avoid triggering Change Detection 60 times/sec
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    this.particles = [];
    
    // Adjust particle count based on screen size
    if (window.innerWidth < 768) {
      this.particleCount = 30;
    } else {
      this.particleCount = 75;
    }

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
      });
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update & draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.65)';
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      // Connect with other particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const alpha = (1 - dist / this.connectionDistance) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (this.mouse.active) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouseConnectionDistance) {
          const alpha = (1 - dist / this.mouseConnectionDistance) * 0.6;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.resizeCanvas();
    this.createParticles();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.mouse.active = true;
  }

  @HostListener('window:mouseleave')
  onMouseLeave(): void {
    this.mouse.active = false;
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
