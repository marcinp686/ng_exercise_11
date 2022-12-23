import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { JobModel } from '../models/job.model';
import { JobTagModel } from '../models/jobTag.model';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {
  
  constructor(private httpClient: HttpClient) {}

  // --- JobTag operations --- 
  // Get single JobTag
  getTag(id: number): Observable<JobTagModel> {
    return this.httpClient.get<JobTagModel>(`https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags/${id}`);
  }

  // Update JobTag
  updateTag(tag: JobTagModel): Observable<void> {
    return this.httpClient.put<void>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags/'+ tag.id.toString(),tag);
  }

  // Get all JobTags
  getTags() : Observable<JobTagModel[]> {
    return this.httpClient.get<JobTagModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags');
  }

  // --- Job operations --- 
  // Get jobs and fill in JobModel.jobTags array with tag names, based in jobTagId array.
  getJobsWithTags(): Observable<JobModel[]> {
    let jobs$: Observable<JobModel[]>;    // Job array from api
    let tags$: Observable<JobTagModel[]>; // Tag array from api

    // get jobs with tagIds array. jobTagIds are number | string | null
    jobs$ = this.httpClient.get<JobModel[]>( 'https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts' );
    
    // get tags and map id:string to id:number
    tags$ = this.httpClient.get<JobTagModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-tags')
      .pipe(
        map((tags: JobTagModel[]) =>
          tags.map((tag) => ({ id: Number(tag.id), name: tag.name }))
        ),
        shareReplay()
      );

    // Job with tag names looked up from tags' array with 'id' key
    let jobsWithTags: Observable<JobModel[]>;

    jobsWithTags = combineLatest([jobs$, tags$]).pipe(
      map(([jobs, tags]) =>
        jobs.map(
          (job) =>
            ({
              ...job,
              jobTags: tags
                .filter((tag) => job.jobTagIds.includes(tag.id))
                .map((tag) => tag.name),
            } as JobModel)
        )
      )
    );

    return jobsWithTags;
  }

  // Get single job with ID number
  getJob(id: number): Observable<JobModel> {
    return this.httpClient.get<JobModel>(`https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts/${id}`);
  }

  // Update job with ID number
  updateJob(job: JobModel) : Observable<void> {
    return this.httpClient.put<void>('https://636ce2d8ab4814f2b2712854.mockapi.io/job-posts/'+job.id.toString(), job);
  }
}
