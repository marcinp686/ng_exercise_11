import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditTagComponent } from './components/edit-tag/edit-tag.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'edit-tag/:id', component: EditTagComponent},
  imports: [RouterModule.forRoot([])],
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
