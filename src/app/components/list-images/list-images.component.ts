import { Component } from '@angular/core';
import { ImageService } from '../../services';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { SpinnerComponent } from '../../shared';
@Component({
  selector: 'app-list-images',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './list-images.component.html',
  styleUrl: './list-images.component.css',
})
export class ListImagesComponent {
  paramToSearch = '';
  suscription: Subscription;
  images: any[] = [];
  loading = false;
  imagesPerPage = 30;
  currentPage = 1;
  calculateTotalPages = 0;

  constructor(private _imageService: ImageService) {
    this.suscription = this._imageService.getSearch().subscribe((data) => {
      this.paramToSearch = data;
      this.currentPage = 1;
      this.getImages();
    });
  }

  getImages() {
    this.loading = true;

    this._imageService
      .getImages(this.paramToSearch, this.imagesPerPage, this.currentPage)
      .subscribe({
        next: (data) => {
          if (data?.hits?.length === 0) {
            this._imageService.setError("Opps, we don't found any results.");
            this.loading = false;
            return;
          }

          this.calculateTotalPages = Math.ceil(
            data.totalHits / this.imagesPerPage
          );
          this.images = data?.hits;
          this.loading = false;
        },
        error: (error) => {
          this._imageService.setError('Opps, happend a error with the server.');
          this.loading = false;
        },
      });
  }

  beforePage() {
    this.currentPage =
      this.currentPage === 1 ? this.currentPage : this.currentPage - 1;

    this.loading = true;
    this.images = [];
    this.getImages();
  }

  afterPage() {
    this.currentPage =
      this.currentPage + 1 > this.calculateTotalPages
        ? this.currentPage
        : this.currentPage + 1;

    this.loading = true;
    this.images = [];
    this.getImages();
  }

  getBeforePageDisabled() {
    return this.currentPage === 1 ? 'disabled' : '';
  }

  getAfterPageDisabled() {
    return this.currentPage + 1 > this.calculateTotalPages ? 'disabled' : '';
  }
}
