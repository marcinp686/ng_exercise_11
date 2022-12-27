import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, Observable, Subject, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { UploadcareResponse } from 'src/app/models/uploadcareResponse.model';
import { FakestoreService } from 'src/app/services/fakestore.service';
import { UploadcareService } from 'src/app/services/uploadcare.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductComponent implements OnInit {

  public categories$!       : Observable<Category[]>;
  public productFormGroup!  : FormGroup;
 // public product$!          : Observable<Product>;
  private productImageUrl   : BehaviorSubject<SafeUrl | null> = new BehaviorSubject<SafeUrl | null>(null);
  public productImageUrl$   : Observable<SafeUrl | null> = this.productImageUrl.asObservable();

  constructor(private fakestore: FakestoreService, private route: ActivatedRoute, private sanitizer : DomSanitizer, private uploadcare: UploadcareService) { }

  ngOnInit(): void {
    // get categories array from endpoint
    this.categories$ = this.fakestore.getCategories();
    
    // Edit product form group
    this.productFormGroup = new FormGroup({
      id          : new FormControl<number | null>(null),
      title       : new FormControl<string>('', Validators.required),
      description : new FormControl<string>('', Validators.required),
      category    : new FormControl<string>('', Validators.required),
      price       : new FormControl<number>(0, Validators.required),
      image       : new FormControl<string>('', Validators.required)
    })

    // Fill product's form with current data from endpoint based on id from route
    this.route.params.pipe(
      switchMap((params: Params) => this.fakestore.getProduct(params['id']).pipe(
        tap( (product: Product) => {
          this.productFormGroup.patchValue(product);
          this.productImageUrl.next(product.image);
        })
      ))
    ).subscribe();   
  }
  
  // When form's submit button is clicked  
  onSubmit(form: Product) : void {    
    this.fakestore.updateProduct(form).subscribe();
  }
  
  onProductImageClear() : void {
    this.productFormGroup.get('image')?.reset();
    this.productImageUrl.next(null);
  }

  onProductImageChanged(event: any) : void {
    const imageFile : File = event.target.files[0];
    
    let fileReader : FileReader = new FileReader();
    fileReader.onloadend = () => { this.productImageUrl.next( this.sanitizer.bypassSecurityTrustUrl( fileReader.result as string ) ) };
    fileReader.readAsDataURL( imageFile );

    // upload image
    this.uploadProductImage( imageFile );
  }

  uploadProductImage(file: File) : void {
    // post file to endpoint and update image url in form
    this.uploadcare.uploadProductImage(file).subscribe(
      {
        next: (resp : UploadcareResponse) => {
          
          this.productFormGroup.get('image')?.setValue('https://ucarecdn.com/'+resp['hash']+'/');
          this.productFormGroup.get('image')?.markAsDirty();
        }
      }
    );
  }
    
  

}
