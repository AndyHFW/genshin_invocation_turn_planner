import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GiTcgPlannerComponent } from './gi-tcg-planner.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GiTcgPlannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [GiTcgPlannerComponent]
})
export class GiTcgPlannerModule { }
