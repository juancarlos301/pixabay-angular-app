import { Component } from '@angular/core';
import { ImageService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-images',
  standalone: true,
  imports: [],
  templateUrl: './list-images.component.html',
  styleUrl: './list-images.component.css',
})
export class ListImagesComponent {
  paramToSearch = '';
  suscription: Subscription;
  images = [];

  constructor(private _imageService: ImageService) {
    this.suscription = this._imageService.getSearch().subscribe((data) => {
      this.paramToSearch = data;
    });
  }

  getImages() {
    this._imageService.getImages(this.paramToSearch).subscribe((data) => {
      this.images = data;
    });
  }
}
