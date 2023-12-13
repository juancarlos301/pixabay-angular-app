import { Component, OnDestroy } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent implements OnDestroy {
  text = '';
  show = false;
  suscription: Subscription;

  constructor(private _imageService: ImageService) {
    this.suscription = this._imageService.getError().subscribe((data) => {
      this.showMessage();
      this.text = data;
    });
  }

  showMessage() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
