import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { PTableComponent } from './Shared/component/p-table/p-table.component';
import { MakeDraggable,MakeDroppable,Draggable  } from './Shared/component/drag-drop-service/drag.n.drop';

import {ConfirmService} from './Shared/component/p-confirmation/confirm.service';
import {ConfirmComponent} from './Shared/component/p-confirmation/confirm.component';

import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-popover';

@NgModule({
  imports:      [ BrowserModule,FormsModule,PopoverModule ],
  declarations: [ AppComponent,PTableComponent,MakeDraggable,MakeDroppable,Draggable,ConfirmComponent],
  bootstrap:    [ AppComponent ],
  providers:[ConfirmService]
})
export class AppModule { }
  