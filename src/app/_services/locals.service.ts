import {Component, Input, OnInit} from '@angular/core';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocalsService implements OnInit {
  constructor(
    private http: HttpClient
  ) {
  }

  public navigationSource = new Subject<any>();
  navigationDetails = this.navigationSource.asObservable();


  get() {
    return this.http.get('assets/locals.json')
      .map((response: Response) => {
          console.log(response);
          return response;
        }
      );
  }


  ngOnInit() {
  }
}
