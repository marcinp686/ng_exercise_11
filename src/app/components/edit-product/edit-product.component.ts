import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { FakestoreService } from 'src/app/services/fakestore.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProductComponent implements OnInit {

  public categories$!       : Observable<Category[]>;
  public productFormGroup!  : FormGroup;
  public product$!          : Observable<Product>;

  constructor(private fakestore: FakestoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get categories array from endpoint
    this.categories$ = this.fakestore.getCategories();
    
    // Edit product form group
    this.productFormGroup = new FormGroup({
      title       : new FormControl<string>('', Validators.required),
      description : new FormControl<string>('', Validators.required),
      category    : new FormControl<string>('', Validators.required),
      price       : new FormControl<number>(0, Validators.required)
    })

    // Fill products form's with current data from endpoint based on id from route
    this.product$ = this.route.params.pipe(
      switchMap((params: Params) => this.fakestore.getProduct(params['id']).pipe(
        tap( (product: Product) => {
          this.productFormGroup.get('title')?.setValue(product.title);
          this.productFormGroup.get('description')?.setValue(product.description);
          this.productFormGroup.get('category')?.setValue(product.category);
          this.productFormGroup.get('price')?.setValue(product.price);
        })
      ))
    );   
  
  }  
  
  // Form's submit button clicked
  onSubmit(form: Product) : void {
    
    // fill in ID of product being updated
    form.id = this.route.snapshot.params['id'],
    this.fakestore.updateProduct(form).subscribe();
  }
  

}
