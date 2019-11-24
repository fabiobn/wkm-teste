import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
	  CommonModule,
	  FormsModule,
	  IonicModule,
	  ReactiveFormsModule,
	  FlexLayoutModule
  ],
  exports: [
	  CommonModule,
	  FormsModule,
	  IonicModule,
	  ReactiveFormsModule,
	  FlexLayoutModule
  ]
})
export class SharedModule {
}
