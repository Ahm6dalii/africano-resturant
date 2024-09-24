import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {
  apiLink:BehaviorSubject<string>=new BehaviorSubject('http://localhost:3000')
  constructor() { 
  }
}
