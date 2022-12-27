import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'

import { EditTagComponent } from './components/edit-tag/edit-tag.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTagComponent,
    EditProductComponent,
    EditJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
