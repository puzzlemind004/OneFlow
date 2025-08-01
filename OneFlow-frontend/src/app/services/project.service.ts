import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
  ownerId: number;
  owner?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  tasks?: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'feature' | 'bug' | 'task' | 'epic';
  estimatedHours?: number;
  dueDate?: string;
  projectId: number;
  assignedToId?: number;
  createdById: number;
  assignedTo?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  status?: 'draft' | 'active' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
  ownerId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3333/api/v1';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<{ projects: Project[] }> {
    return this.http.get<{ projects: Project[] }>(`${this.apiUrl}/projects`);
  }

  getProject(id: number): Observable<{ project: Project }> {
    return this.http.get<{ project: Project }>(`${this.apiUrl}/projects/${id}`);
  }

  createProject(project: CreateProjectRequest): Observable<{ message: string; project: Project }> {
    return this.http.post<{ message: string; project: Project }>(`${this.apiUrl}/projects`, project);
  }

  updateProject(id: number, project: Partial<CreateProjectRequest>): Observable<{ message: string; project: Project }> {
    return this.http.put<{ message: string; project: Project }>(`${this.apiUrl}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/projects/${id}`);
  }
}