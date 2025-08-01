import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">OneFlow</h1>
            </div>
            <div class="flex items-center space-x-4">
              @if (currentUser) {
                <span class="text-gray-700">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
                <button
                  (click)="logout()"
                  class="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              }
            </div>
          </div>
        </div>
      </nav>

      <!-- Main content -->
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Welcome section -->
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg font-medium text-gray-900 mb-4">
                Welcome back, {{ currentUser?.firstName }}!
              </h2>
              <p class="text-gray-600">
                Here's an overview of your projects and recent activity.
              </p>
            </div>
          </div>
        </div>

        <!-- Projects section -->
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Your Projects</h3>
                <button
                  routerLink="/projects/new"
                  class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  New Project
                </button>
              </div>

              @if (loading) {
                <div class="text-center py-4">
                  <div class="text-gray-500">Loading projects...</div>
                </div>
              } @else if (projects.length === 0) {
                <div class="text-center py-8">
                  <div class="text-gray-500 mb-4">No projects found</div>
                  <button
                    routerLink="/projects/new"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Create your first project
                  </button>
                </div>
              } @else {
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  @for (project of projects; track project.id) {
                    <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 class="font-medium text-gray-900 mb-2">{{ project.name }}</h4>
                      <p class="text-gray-600 text-sm mb-3">{{ project.description }}</p>
                      <div class="flex justify-between items-center">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              [class]="getStatusClass(project.status)">
                          {{ project.status }}
                        </span>
                        <button
                          [routerLink]="['/projects', project.id]"
                          class="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  projects: Project[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.projects;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load projects:', error);
        this.loading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}