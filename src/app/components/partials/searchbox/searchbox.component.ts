import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  query = '';

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['query']) {
        this.query = params['query'];
      }
    });
  }

  ngOnInit(): void {}

  doSearch(query: string): void {
    if (query) {
      this.router.navigateByUrl(`/search/${query}`);
    }
  }

  doSubmit(e: Event): void {
    e.preventDefault();
  }
}
