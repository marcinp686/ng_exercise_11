import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, delay, Observable, switchMap, tap } from 'rxjs';
import { JobModel } from 'src/app/models/job.model';
import { JobTagModel } from 'src/app/models/jobTag.model';
import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditJobComponent implements OnInit {

  jobFormGroup!     : FormGroup;
  jobTags$!         : Observable<JobTagModel[]>;
  job$!             : Observable<JobModel>;

  constructor(private mockapi: MockApiService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // Job edit form group
    this.jobFormGroup = new FormGroup({
      title       : new FormControl<string>('', Validators.required),
      description : new FormControl<string>('', Validators.required),
      id          : new FormControl<number>(-1),
      tags        : new FormGroup({}),
    });

    // Get JobTags from api and prepare selection array with necessary FormControls
    this.jobTags$ = this.mockapi.getTags().pipe(
      tap((tags) =>
        tags.forEach( tag => {
          (this.jobFormGroup.get('tags') as FormGroup).addControl(
            tag.id.toString(),
            new FormControl<boolean>(false)
          );
        })
      )
    );

    // Get Job detail from api and set FormControls' values respectively
    this.job$ = combineLatest([this.route.params, this.jobTags$]).pipe(
      switchMap(([params, tags]) =>
        this.mockapi
          .getJob(params['id'])
          .pipe(tap( job => {
            this.jobFormGroup.patchValue(job);
            job.jobTagIds.forEach( tagId => this.jobFormGroup.get('tags.'+tagId.toString())?.setValue(true) )
          }))
      )
    );
  }

  onSubmit(data: {title : string, description : string, id: number, tags: {id: number, selected: boolean}[] }) : void {
    
    // prepare array of tag ids selected
    const tagsGroup = this.jobFormGroup.get('tags') as FormGroup;
    let tagIds : number[] = [];

    for(const controlName of Object.keys(tagsGroup.controls))
      if(tagsGroup.get(controlName)?.value===true) tagIds.push(Number(controlName));
    
    // prepare object with updated data to put to the api
    let updatedJob : JobModel = {
      title: data.title,
      description: data.description,
      id: data.id,
      jobTagIds: tagIds
    }

    this.mockapi.updateJob(updatedJob).subscribe();
    
  }

}
