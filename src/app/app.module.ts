import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { PTableComponent } from './Shared/component/p-table/p-table.component';
import { MakeDraggable,MakeDroppable  } from './Shared/component/drag-drop-service/drag.n.drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule,FormsModule ],
  declarations: [ AppComponent,PTableComponent,MakeDraggable,MakeDroppable],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
