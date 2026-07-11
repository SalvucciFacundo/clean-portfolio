import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
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

  getProfile(): Observable<any> {
    const profileDoc = doc(this.firestore, 'about/profile');
    return docData(profileDoc) as Observable<any>;
  }

  getContactInfo(): Observable<any> {
    const contactDoc = doc(this.firestore, 'about/contact');
    return docData(contactDoc) as Observable<any>;
  }

  getExperience(): Observable<any[]> {
    const experienceCol = collection(this.firestore, 'experience');
    return collectionData(experienceCol, { idField: 'id' }) as Observable<any[]>;
  }

  addExperience(exp: any) {
    const experienceCol = collection(this.firestore, 'experience');
    return addDoc(experienceCol, exp);
  }

  updateExperience(id: string, exp: Partial<any>) {
    const experienceDoc = doc(this.firestore, `experience/${id}`);
    return setDoc(experienceDoc, exp, { merge: true });
  }

  deleteExperience(id: string) {
    const experienceDoc = doc(this.firestore, `experience/${id}`);
    return deleteDoc(experienceDoc);
  }

  getEducation(): Observable<any[]> {
    const educationCol = collection(this.firestore, 'education');
    return collectionData(educationCol, { idField: 'id' }) as Observable<any[]>;
  }

  addEducation(edu: any) {
    const educationCol = collection(this.firestore, 'education');
    return addDoc(educationCol, edu);
  }

  updateEducation(id: string, edu: Partial<any>) {
    const educationDoc = doc(this.firestore, `education/${id}`);
    return setDoc(educationDoc, edu, { merge: true });
  }

  deleteEducation(id: string) {
    const educationDoc = doc(this.firestore, `education/${id}`);
    return deleteDoc(educationDoc);
  }
}
