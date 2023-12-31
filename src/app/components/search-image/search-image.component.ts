import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ImageService } from '../../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-image',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-image.component.html',
  styleUrl: './search-image.component.css',
})
export class SearchImageComponent {
  nameImage = '';

  constructor(private _imageService: ImageService) {}
  searchImages() {
    if (this.nameImage === '') {
      this._imageService.setError('Add a search text.');
      return;
    }
    this._imageService.sendSearch(this.nameImage);
  }
}
