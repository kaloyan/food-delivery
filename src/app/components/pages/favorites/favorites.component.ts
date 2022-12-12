import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  foods!: Food[];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.foods = this.favoritesService.getAll();
  }
}
