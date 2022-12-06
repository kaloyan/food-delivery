import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PAGE_SIZE } from 'src/app/shared/constants/settings';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() slice!: any;
  @Input() itemsCount!: number;

  showPrev = false;
  showNext = false;
  currentPage: number = 1;
  prevPage = 0;
  nextPage = 2;
  pageCount = 0;
  pageItems: number[] = [];
  pagerPrefix: string = '';

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params['num']) {
        this.currentPage = params['num'];
      } else {
        this.currentPage = 1;
      }

      if (params['query']) {
        this.pagerPrefix = `/search/${params['query']}/page/`;
      } else {
        this.pagerPrefix = '/page/';
      }
    });
  }

  ngOnChanges(): void {
    this.showPrev = this.currentPage > 1;
    this.showNext = this.slice.start < this.itemsCount - this.slice.count;

    this.nextPage = Number(this.currentPage) + 1;
    this.prevPage = Number(this.currentPage) - 1;

    this.pageCount = Math.ceil(this.itemsCount / PAGE_SIZE);

    this.pageItems = [];

    for (let i = 1; i <= this.pageCount; i++) {
      this.pageItems.push(i);
    }

    if (this.pageCount > 7) {
      if (this.currentPage > 4) {
        this.pageItems = this.pageItems.slice(this.currentPage - 4);
      }

      if (this.currentPage < this.pageCount - 4) {
        this.pageItems = this.pageItems.slice(0, 7);
      }
    }

    // console.log(this.itemsCount);
    // console.log(this.slice);
    // console.log(this.currentPage);
    // console.log(this.pageCount);
  }
}
