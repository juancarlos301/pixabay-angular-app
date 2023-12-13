import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {
  NavbarComponent,
  ListImagesComponent,
  SearchImageComponent,
} from './components';
import { ErrorComponent } from './shared';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    SearchImageComponent,
    ListImagesComponent,
    ErrorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'pixabay-angular-app';
}
