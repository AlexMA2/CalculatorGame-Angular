import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentDirective } from './dynamic-component.directive';



@NgModule({
  declarations: [
    DynamicComponentDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicComponentModule { }
