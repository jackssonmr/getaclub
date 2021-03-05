import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ROOT Components and Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Features
import { Covid19Module } from './features/covid19/covid19.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Covid19Module,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
