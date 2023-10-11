import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly search = new BehaviorSubject<string>('');

  constructor(private readonly router: Router) {}

  public get searchQuery(): Observable<string> {
    return this.search.asObservable();
  }

  public set searchQuery(value: string) {
    this.router.navigate(['/']).then(() => this.search.next(value));
  }
}
