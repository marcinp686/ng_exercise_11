import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditTagComponent } from './components/edit-tag/edit-tag.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'edit-tag/:id', component: EditTagComponent},
    {path: 'edit-product/:id', component: EditProductComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
