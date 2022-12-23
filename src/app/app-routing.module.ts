import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditTagComponent } from './components/edit-tag/edit-tag.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'edit-tag/:id', component: EditTagComponent},
    {path: 'edit-product/:id', component: EditProductComponent},
    {path: 'edit-job/:id', component: EditJobComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
