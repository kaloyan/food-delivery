import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  tags?: Tag[];

  constructor(foodService: FoodService, private router: Router) {
    this.tags = foodService.getAllTags();
  }

  ngOnInit(): void {}

  getTag(tag: string) {
    this.router.navigateByUrl(`/tag/${tag}`);
  }
}
