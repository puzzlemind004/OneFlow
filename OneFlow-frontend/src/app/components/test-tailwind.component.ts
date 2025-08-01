import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-tailwind',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"
    >
      <div class="shrink-0">
        <div
          class="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <span class="text-white font-bold">✓</span>
        </div>
      </div>
      <div>
        <div class="text-xl font-medium text-black">Tailwind CSS</div>
        <p class="text-slate-500">Fonctionne correctement avec Angular!</p>
        <div class="mt-2 flex space-x-2">
          <span
            class="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full"
            >Angular 20</span
          >
          <span
            class="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full"
            >Tailwind CSS</span
          >
        </div>
      </div>
    </div>
  `,
})
export class TestTailwindComponent {}
