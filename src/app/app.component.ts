import { Component, OnInit } from '@angular/core';
import { ConfirmService } from './Shared/component/p-confirmation/confirm.service';
import {ConfirmComponent} from './Shared/component/p-confirmation/confirm.component';
declare var jQuery: any;

@Component({
  selector: 'my-app',
  template: `
  <div  makeDroppable>
      <div class="row">
        <div class="col-sm-12">
        <div style="width:90%">
           <div [ngClass]="{'custom-reflow-modal': activeReflow}">
           <button class="btn btn-primary">Create new idea</button>
             <h1>P Table Demo</h1>  
              <app-p-table [pTableSetting]="territoryListTableBind" [pTableMasterData]="territoryNodes" (customReflowFn)="fnCustomReflowSetting($event)"></app-p-table><br/><br/>
            </div>
         </div>
         

           <div style="width:10%"></div>
       </div>
    </div>
    <div class="row">
       <ul>
       <div *ngFor="let todo of todos" class="dragable-content" [makeDraggable]="todo" makeDroppable (dropped)="onDrop($event, todo)">
        <li class="dragable">
          <span>{{todo.description}}</span>
        </li>
    
        </div>
        </ul>
     </div>


    
       <div [ng2-draggable]="true">
        <li class="dragable">
          <span>dragable</span>
        </li>
    
        </div>
       
      
    <button class="btn btn-primary" (click)="prompt()">click me</button>
     <p-confirm></p-confirm>

 </div>
  `,
  styles: [`li.dragable{
    font-weight:bold;
    border-radius:10px;
    background-color:#e7e7e7;
    padding:5px;
    width:250px;
    list-style:none;
    cursor:move;
    border-bottom-style:solid;
  }
  .custom-reflow-modal{
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    top: 0px;
    left: 0px;
    transition: 0.7s;
    z-index: 999;
  }
  div.dragable-content{
    padding:5px;
  }`]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  public territoryNodes: any[];
  public todos: any[] = [{ order: 0, description: 'A Clean up code' },
  { order: 1, description: 'B Blog about it' },
  { order: 2, description: 'C Push code to Github' },
  { order: 3, description: 'D Share blog on twitter' },
  { order: 3, description: 'E Share blog on twitter' },
  { order: 3, description: 'F Share blog on twitter' },
  { order: 3, description: 'G Share blog on twitter' },
  { order: 3, description: 'H Share blog on twitter' },
  { order: 3, description: 'I Share blog on twitter' }]

  constructor(private _confirm: ConfirmService) {
    this.territoryNodes = [
      { NodeCode: '10', NodeName: 'Node A', BrickOutletCount: 10 },
      { NodeCode: '11', NodeName: 'Node B', BrickOutletCount: 10 },
      { NodeCode: '12', NodeName: 'Node C', BrickOutletCount: 11 },
      { NodeCode: '13', NodeName: 'Node C', BrickOutletCount: 10 },
      { NodeCode: '10', NodeName: 'Node A', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node D', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node X', BrickOutletCount: 10 },
      { NodeCode: '11', NodeName: 'Node Y', BrickOutletCount: 10 },
      { NodeCode: '12', NodeName: 'Node Z', BrickOutletCount: 11 },
      { NodeCode: '13', NodeName: 'Node M', BrickOutletCount: 10 },
      { NodeCode: '10', NodeName: 'Node A', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node D', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node E', BrickOutletCount: 10 },
      { NodeCode: '11', NodeName: 'Node F', BrickOutletCount: 10 },
      { NodeCode: '12', NodeName: 'Node G', BrickOutletCount: 11 },
      { NodeCode: '13', NodeName: 'Node H', BrickOutletCount: 10 },
      { NodeCode: '10', NodeName: 'Node I', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node J', BrickOutletCount: 12 },
      { NodeCode: '10', NodeName: 'Node X', BrickOutletCount: 10 },
      { NodeCode: '2', NodeName: 'Node Y', BrickOutletCount: 10 },
      { NodeCode: '1', NodeName: 'Node Z', BrickOutletCount: 11 },
      { NodeCode: '13', NodeName: 'Node M', BrickOutletCount: 1 },
      { NodeCode: '10', NodeName: 'Node A', BrickOutletCount: 15 },
      { NodeCode: '10', NodeName: 'Node D', BrickOutletCount: 1 }
    ];
  }
  public territoryListTableBind: any;
  ngOnInit() {
    this.territoryListTableBind = {
      tableID: "territory-list-table",
      tableClass: "table table-border ",
      tableName: "Territory List",
      tableRowIDInternalName: "NodeCode",
      tableColDef: [
        { headerName: 'Code', width: '17%', internalName: 'NodeCode', className: "territory-list-code", sort: true, type: "", onClick: "" },
        { headerName: 'Territory', width: '55%', internalName: 'NodeName', className: "territory-list-territory", type: "", onClick: "", applyColFilter: false },
        { headerName: 'Brick Count', width: '15%', internalName: 'BrickOutletCount', className: "territory-list-bricks", sort: false, type: "", onClick: "Yes" },

      ],
      enabledSearch: true,
      enabledSerialNo: true,
      pageSize: 8,
      displayPaggingSize: 10,
      enabledDataLength: true,
      enabledCellClick: true,
      enabledColumnFilter: true,
      enabledReflow: true,
      enabledColumnSetting: true,
      enabledReordering: true,
    };
  }
  showPTable() {
  }

  onDrop(src: any, trg: any) {
    this._moveRow(this.todos.map(x => x.description).indexOf(src.description), this.todos.map(x => x.description).indexOf(trg.description));

    //myArray.map(x => x.hello).indexOf('stevie')
  }

  _moveRow(src: any, trg: any) {
    debugger;
    src = parseInt(src);
    trg = parseInt(trg);

    // If the element was moved down
    /*if (src > trg) {
      for (let i = trg; i < src; i++) {
        this.todos[i].order++;
      }
    } else {  // if the element was moved up
      for (let i = src + 1; i <= trg; i++) {
        this.todos[i].order--;
      }
    }
    this.todos[src].order = trg;
    this.todos.sort((a, b) => a.order - b.order);*/


    if (trg >= this.todos.length) {
      var k = trg - this.todos.length;
      while ((k--) + 1) {
        this.todos.push(undefined);
      }
    }
    this.todos.splice(trg, 0, this.todos.splice(src, 1)[0]);
    return this; // for testing purposes

  }

  public prompt() {
    this._confirm.activate('Confirm?')
      .then(result => {
        alert(result);
      }).catch(error => {
        console.log(error);
      });
  }
  public activeReflow: boolean = false;
  fnCustomReflowSetting(event: string) {
    if (this.activeReflow) {
      jQuery("#" + event + "-fitlerInfo").hide();
      this.activeReflow = false;
    } else {
      this.activeReflow = true;
    }
  }
}
