import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly search = new BehaviorSubject<string>('');

  public get searchQuery(): Observable<string> {
    return this.search.asObservable();
  }

  public set searchQuery(value: string) {
    this.search.next(value);
  }
}
