import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HttpClientModule } from '@angular/common/http';
import { DragulaModule } from 'ng2-dragula';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const BS_DROPDOWN_CUSTOM = {
  isAnimated: false,
  autoClose: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidemenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    HttpClientModule,
    DragulaModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,

  },
  {
    provide: BsDropdownConfig,
    useValue: BS_DROPDOWN_CUSTOM
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
