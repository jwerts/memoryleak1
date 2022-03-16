import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LeakModule } from './leak/leak.module';
import { MapModule } from './map/map.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MapModule,
    LeakModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
