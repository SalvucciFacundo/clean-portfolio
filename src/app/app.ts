import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Education } from './components/education/education';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Hero, Skills, Projects, Education, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
