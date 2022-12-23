import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { JobTagModel } from 'src/app/models/jobTag.model';

import { MockApiService } from 'src/app/services/mock-api.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.scss'],
})
export class EditTagComponent {
  // Id of tag that is beeing edited
  private currentId!: number;

  // FormGroup with controls to edit tag data
  tagFormGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  // 1. Create an Observable that holds current jobTag's data from endpoint
  // 2. Update name FormControl to reflect value of tag with 'id'
  // 3. Assign currentId to class property
  public detail$: Observable<JobTagModel> = this.route.params.pipe(
    switchMap((params: Params) =>
      this.jobTagService
        .getTag(params['id'])
        .pipe(
          tap((result) =>
            this.tagFormGroup.get('name')?.patchValue(result.name)
          )
        )
    ),
    tap((params) => (this.currentId = params['id']))
  );

  constructor( private jobTagService: MockApiService,private route: ActivatedRoute ) { }

  // When user clicks Submit button on form
  onJobTagSubmit(): void {
    // Create object that holds new jobTag's data
    let updatedJobTag: JobTagModel = {
      id: this.currentId,
      name: this.tagFormGroup.get('name')?.value,
    };

    // Send data to endpoint
    this.jobTagService.updateTag(updatedJobTag).subscribe();
  }
}
