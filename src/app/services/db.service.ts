import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Project {
  id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link?: string;
  repoLink?: string;
  statusLabel?: string;
}

export interface Skill {
  id?: string;
  name: string;
  imgUrl?: string;
  icon?: string;
  color: string;
  bgColor: string;
  featured?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private firestore = inject(Firestore);

  getProjects(): Observable<Project[]> {
    const projectsCol = collection(this.firestore, 'projects');
    return collectionData(projectsCol, { idField: 'id' }) as Observable<Project[]>;
  }

  addProject(project: Project) {
    const projectsCol = collection(this.firestore, 'projects');
    return addDoc(projectsCol, project);
  }

  updateProject(id: string, project: Partial<Project>) {
    const projectDoc = doc(this.firestore, `projects/${id}`);
    return setDoc(projectDoc, project, { merge: true });
  }

  deleteProject(id: string) {
    const projectDoc = doc(this.firestore, `projects/${id}`);
    return deleteDoc(projectDoc);
  }

  getSkills(): Observable<Skill[]> {
    const skillsCol = collection(this.firestore, 'skills');
    return collectionData(skillsCol, { idField: 'id' }) as Observable<Skill[]>;
  }

  addSkill(skill: Skill) {
    const skillsCol = collection(this.firestore, 'skills');
    return addDoc(skillsCol, skill);
  }

  updateSkill(id: string, skill: Partial<Skill>) {
    const skillDoc = doc(this.firestore, `skills/${id}`);
    return setDoc(skillDoc, skill, { merge: true });
  }

  deleteSkill(id: string) {
    const skillDoc = doc(this.firestore, `skills/${id}`);
    return deleteDoc(skillDoc);
  }
}
