import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobTag } from '../models/job-tag.mogel';

@Injectable({
  providedIn: 'root'
})
export class JobTagService {

  constructor(private httpClient: HttpClient) { }

  getOne(id: number) : Observable<JobTag> {
    return this.httpClient.get<JobTag>(`https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags/${id}`);
  }

  update(tag: JobTag) : Observable<void> {
    return this.httpClient.post<void>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags', tag);
  }
}
