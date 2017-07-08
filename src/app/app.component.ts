import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>P Table Demo</h1>  
  <app-p-table [pTableSetting]="territoryListTableBind" [pTableMasterData]="territoryNodes"></app-p-table>`,
})
export class AppComponent implements OnInit {
    name = 'Angular';
  public territoryNodes: any[];
  constructor() {
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
        { headerName: 'Territory', width: '55%', internalName: 'NodeName', className: "territory-list-territory", type: "", onClick: "",applyColFilter:false },
        { headerName: 'Brick Count', width: '15%', internalName: 'BrickOutletCount', className: "territory-list-bricks", sort: false, type: "", onClick: "Yes" },

      ],
      enabledSearch: true,
      enabledSerialNo:true,
      pageSize: 8,
      displayPaggingSize: 10,
      enabledDataLength: true,
      enabledCellClick: true,
      enabledColumnFilter: true,
    };
  }
   showPTable() {   
  }
}
