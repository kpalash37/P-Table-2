import { Component, OnInit, DoCheck, Input, Output, OnChanges, SimpleChange, ChangeDetectionStrategy, KeyValueDiffers, EventEmitter, Renderer } from '@angular/core';
import { PTableFilterComponent } from './p-table-pipe';
import { PagerService } from './p-table-pagger';

declare var jQuery: any;
@Component({
  selector: 'app-p-table',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './p-table.component.html',
  styleUrls: ['./p-table.component.css'],
  providers: [PagerService],

})

export class PTableComponent implements OnInit, DoCheck {
  @Input() public pTableSetting: IPTableSetting;
  @Input() pTableMasterData: any[];
  @Output() checkboxCallbackFn: EventEmitter<any> = new EventEmitter<any>() || null;
  @Output() callbackFnOnPageChange: EventEmitter<any> = new EventEmitter<any>() || null;
  @Output() radioButtonCallbackFn: EventEmitter<any> = new EventEmitter<any>() || null;
  @Output() cellClickCallbackFn: EventEmitter<any> = new EventEmitter<any>() || null;
  @Output() customReflowFn: EventEmitter<any> = new EventEmitter<any>() || null;
  public editUpdateColumn: boolean = true;
  public noRecord = true;
  public pageSize: number;
  public showingPageDetails: string;
  public pTableData: any[] = [{}];
  public pTableDatalength: number = 0;
  public startPageNo: number = 0;
  public totalColspan = 0;
  public maximumPaggingDisplay: number;
  public pageNo: number = 0;
  public differ: any;
  public rowLimitArray: any[] = [10, 20, 50, 100, 200, 500, 1000];
  public enabledPagination: boolean = true;
  public globalSearchValue: string = "";

  //for table smart filter
  public filterCustomColumnName: string;
  public filterColumnTitle: string;
  public customFilterUniqueArray: any[] = [];
  public columnWiseMasterData: any[] = [];
  public filterItemsCheckedAll: boolean = false;
  public popupFilterColor: string = 'black';
  public storedFilteredInfo: any[] = [];
  public columnSearchValue: string = "";
  public activeReflow: boolean = false;
  public customReflowActive: boolean = false;
  public pTableColumnSearch: string = "";
  public pTableColumnCustomizationList: any[] = [];
  public pTableColumnReorder: any[] = [];
  public settingsTabs: any[] = [{ tab: "columnShowHide", tabName: "Show/Hide", active: true }];

  public pModalSetting: any = {
    modalTitle: "",
    modalSaveBtnCaption: "Save"

  };
  pager: any = {};
  pagedItems: any[];
  constructor(private pagerService: PagerService, private differs: KeyValueDiffers, public renderer: Renderer) {
    this.differ = differs.find({}).create(null);
  }


  ngOnInit() {
    if (this.pTableSetting == null) {//to return without values
      return false;
    }

    if (this.pTableSetting["enabledSerialNo"]) {
      this.totalColspan = this.totalColspan + 1;
    }
    if (this.pTableSetting["enabledCheckbox"]) {
      this.totalColspan = this.totalColspan + 1;
    }
    if (this.pTableSetting["enabledEditBtn"]) {
      this.totalColspan = this.totalColspan + 1;
    }

    if (this.pTableSetting["enabledRadioBtn"]) {
      this.totalColspan = this.totalColspan + 1;
    }
	 if (this.pTableSetting["enabledReordering"]) {
		this.settingsTabs.push({ tab: "columnOrder", tabName: "Reorder", active: false });
	 }
    this.pTableSetting["radioBtnColumnHeader"] = this.pTableSetting["radioBtnColumnHeader"] || 'Select';
    this.pTableSetting["checkboxColumnHeader"] = this.pTableSetting["checkboxColumnHeader"] || 'Select';

    this.totalColspan = this.totalColspan + this.pTableSetting["tableColDef"].length;
    this.maximumPaggingDisplay = this.pTableSetting["displayPaggingSize"] || 10;
    if (!this.pTableSetting["enabledPagination"] && this.pTableSetting["enabledPagination"] != undefined) {
      this.enabledPagination = false;
      this.pageSize = 10000;
    } else {
      this.pageSize = this.pTableSetting["pageSize"] || 10;
    }

    //for advanced column filter 
    this.storedFilteredInfo = [];
    this.columnSearchValue = "";
    this.globalSearchValue = "";
    jQuery("#" + this.pTableSetting["tableID"] + " .column-filter-active").css('color', 'white');

	this.pTableColumnCustomizationList = JSON.parse(JSON.stringify(this.pTableSetting.tableColDef)) || [];
    this.pTableColumnReorder = JSON.parse(JSON.stringify(this.pTableSetting.tableColDef)) || [];


  }

  ngDoCheck() {
    if (this.pTableSetting == null) {//to return without values
      return false;
    }

    var changes = this.differ.diff(this.pTableMasterData);
    if (changes) {
      this.pTableData = this.pTableMasterData || [];
      this.pTableDatalength = this.pTableData.length || 0;

      if (this.pTableSetting.disabledTableReset) {
        this.fnShowPreviousFilteredState();
      } else {
        this.storedFilteredInfo = [];
        this.columnSearchValue = "";
        this.globalSearchValue = "";
        jQuery("#" + this.pTableSetting["tableID"] + " .column-filter-active").css('color', 'white');
      }

      //set page state
      if (this.pTableSetting.enabledStaySelectedPage && this.pageNo > 0) {
        this.setPage(this.pageNo);
      } else {
        this.setPage(1);
      }

    }
  }


  fnClickPTableCell(event: any, isCellClick: boolean = false, currentCellName: string, activeClickForThisCell: string, data: any) {
    if (isCellClick && (activeClickForThisCell == "Yes" || activeClickForThisCell == "true")) {
      this.cellClickCallbackFn.emit({ cellName: currentCellName, record: data, event: event });
    } else {
      return;
    }

  }

  fnSaveModalInfo() {
    // this.fnActionOnSaveBtn.emit(this.modalSaveFnParam);
  }

  fnEditRecord(record: any) {
    jQuery("#customModal").modal("show");
  }

  fnDeleteRecord(record: any) {

  }
  async fnFilterPTable(args: any, executionType: boolean = false) {
    let execution = false;
    args = args.trim();
    //this.pTableData=JSON.parse( JSON.stringify( this.pTableMasterData))||[];    
    if (args && this.pTableMasterData.length > 0) {
      let filterKeys = Object.keys(this.pTableMasterData[0]);
      this.pTableData = await this.pTableMasterData.filter((item: any, index: any, array: any) => {
        let returnVal = false;
        for (let i = 0; i < this.pTableSetting["tableColDef"].length; i++) {
          if (typeof item[this.pTableSetting["tableColDef"][i]["internalName"]] == "string") {
            if (item[this.pTableSetting["tableColDef"][i]["internalName"]].toLowerCase().includes(args.toLowerCase())) {
              returnVal = true
            }
          } else if (typeof item[this.pTableSetting["tableColDef"][i]["internalName"]] == "number") {
            if (item[this.pTableSetting["tableColDef"][i]["internalName"]].toString().indexOf(args.toString()) > -1) {
              returnVal = true;
            }

          } else {
            //returnVal = false;
          }

        }

        return returnVal;
      });

    } else {
      this.pTableData = this.pTableMasterData;
    }

    if (executionType) {
    } else {
      this.storedFilteredInfo = [];
      jQuery("#" + this.pTableSetting["tableID"] + " .column-filter-active").css('color', 'white');
      this.setPage(1);
    }

  }


  setPage(page: number) {
    this.pageNo = page;
    this.pager = this.pagerService.getPager(this.pTableData.length, page, this.pageSize, this.maximumPaggingDisplay);
    if (page < 1 || page > this.pager.totalPages) {
      if (page - 1 <= this.pager.totalPages && this.pager.totalPages != 0) {
        if (page <= 0) {
          this.setPage(1);
        } else {
          this.setPage(page - 1);
        }
        return
      }
    }
    //this.pager = this.pagerService.getPager(this.pTableData.length, page, this.pageSize, this.maximumPaggingDisplay);
    if (this.pTableData.length == 0) {
      this.pagedItems = [];
      //jQuery(".table tbody tr").remove();
    } else {
      this.pagedItems = this.pTableData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    this.pTableDatalength = this.pTableData.length;
    //showing page number
    this.startPageNo = (this.pager.currentPage - 1) * this.pager.pageSize + 1;
    let endPageNo = 0;
    if (this.pTableData.length == 0) {
      this.startPageNo = 0;
    }

    if ((this.pager.currentPage) * this.pager.pageSize < this.pTableData.length) {
      endPageNo = (this.pager.currentPage) * this.pager.pageSize;
    } else {
      endPageNo = this.pTableData.length;
    }

    if (this.pTableData.length == this.pTableMasterData.length) {
      this.showingPageDetails = 'Showing ' + this.startPageNo + ' to ' + endPageNo + ' of ' + this.pTableData.length + ' records';
    } else {
      this.showingPageDetails = 'Showing ' + this.startPageNo + ' to ' + endPageNo + ' of ' + this.pTableData.length + ' records (filtered from ' + this.pTableMasterData.length + ' total records)';
    }

    //to remove checkbox 
    if (this.pTableSetting["enabledCheckbox"]) {
      jQuery("#" + this.pTableSetting["tableID"] + " th input.p-table-select-all").prop("checked", false);
      jQuery("#" + this.pTableSetting["tableID"] + " td input.checkbox-" + this.pTableSetting["tableID"]).prop("checked", false);
    }

    //call the function after the page changes
    this.callbackFnOnPageChange.emit({ pageNo: page });

  }
  fnColumnSorting(colName: any, pTableID: any, isSorting: boolean = true) {
    if (!isSorting) {
      return;
    }
    if(this.pTableMasterData.length<1){
      return;
    }
    //console.log(this.pTableMasterData);
    if (jQuery("#" + pTableID + " thead th." + colName).hasClass("sorting")) {
      jQuery("#" + pTableID + " thead th.sorting-active").addClass("sorting").removeClass("sorting-down").removeClass("sorting-up");
      jQuery("#" + pTableID + " thead th." + colName).addClass("sorting-up").removeClass("sorting");
      this.pTableData = this.pTableData.sort((n1, n2) => {
        if (n1[colName] > n2[colName]) { return 1; }
        if (n1[colName] < n2[colName]) { return -1; }
        return 0;
      });
    } else if (jQuery("#" + pTableID + " thead th." + colName).hasClass("sorting-up")) {
      jQuery("#" + pTableID + " thead th." + colName).addClass("sorting-down").removeClass("sorting-up");
      this.pTableData = this.pTableData.sort((n1, n2) => {
        if (n1[colName] < n2[colName]) { return 1; }
        if (n1[colName] > n2[colName]) { return -1; }
        return 0;
      });
    } else if (jQuery("#" + pTableID + " thead th." + colName).hasClass("sorting-down")) {
      jQuery("#" + pTableID + " thead th." + colName).addClass("sorting-up").removeClass("sorting-down");
      this.pTableData = this.pTableData.sort((n1, n2) => {
        if (n1[colName] > n2[colName]) { return 1; }
        if (n1[colName] < n2[colName]) { return -1; }
        return 0;
      });
    }
    this.setPage(1);
  }
  fnOperationOnCheckBox(event: any, args: string) {
    if (event.target.checked) {
      jQuery(".checkbox-" + args).prop("checked", true);
    } else {
      jQuery(".checkbox-" + args).prop("checked", false);
    }

    this.checkboxCallbackFn.emit({ checkedStatus: event.target.checked, record: "", type: "all-select" });
  }

  fnIndividualCheckboxAction(e: any, recordInfo: any) {
    this.checkboxCallbackFn.emit({ checkedStatus: e.target.checked, record: recordInfo, type: "individual" });
  }
  fnIndividualRadioAction(e: any, recordInfo: any) {
    this.radioButtonCallbackFn.emit({ checkedStatus: e.target.checked, record: recordInfo, type: "individual" });
  }
  fnChangePTableRowLength(records: number) {
    this.pageSize = records;
    this.setPage(1);
  }
  fnChangePTableDataLength(event: any) {
    let records = event.target.value;
    this.pageSize = records;
    this.setPage(1);
  }

  public start: any;
  public pressed: any; public startX: any; public startWidth: any;

  private fnResizeColumn(event: any) {
    this.start = event.target;
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = jQuery(this.start).parent().width();
    this.initResizableColumns();
  }

  public initResizableColumns() {
    this.renderer.listenGlobal('body', 'mousemove', (event: any) => {
      if (this.pressed) {
        let width = this.startWidth + (event.x - this.startX);
        jQuery(this.start).parent().css({ 'min-width': width, 'max-   width': width });
        let index = jQuery(this.start).parent().index() + 1;
        jQuery('#' + this.pTableSetting.tableID + ' tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
      }
    });
    this.renderer.listenGlobal('body', 'mouseup', (event: any) => {
      if (this.pressed) {
        this.pressed = false;
      }
    });
  }


  fnIndividualColumnFilterContext(columnDef: any, event: any) {
    this.filterCustomColumnName = columnDef.internalName;
    this.filterColumnTitle = columnDef.headerName;
    this.columnSearchValue = "";
    this.columnWiseMasterData = this.fnFindUniqueColumnWithCheckedFlag(this.pTableData, this.filterCustomColumnName) || [];
    this.customFilterUniqueArray = JSON.parse(JSON.stringify(this.columnWiseMasterData));
    let xPostion = 0;
    //to checked all
    this.filterItemsCheckedAll = true;

    //console.log(event);
    //to set position of pop-up
    let totalScreenX = window.screen.width;

    //console.log("total X: " + totalScreenX + " :pageY" + event.pageY + "event.target.offsetParent.offsetTop" + event.target.offsetParent.offsetTop + "target.offsetTop" + event.target.offsetTop + "event.view.scrollY:" + event.view.scrollY)
    if (event.pageX + 290 > totalScreenX) {
      xPostion = totalScreenX - 320;
    } else {
      xPostion = event.pageX;
    }
    let yPosition = event.pageY + 20;
    //let yPosition = '136';
    let ofset = { "top": yPosition, "left": xPostion };
    //let ofset = { "top": event.pageY - event.target.offsetParent.offsetTop - event.target.offsetTop - event.view.scrollY, "left": event.pageX - event.target.offsetParent.offsetLeft - event.target.offsetLeft - event.view.scrollX };
    //jQuery("#fitlerInfo").css(ofset).show();
    jQuery("#" + this.pTableSetting.tableID + "-fitlerInfo").css(ofset).show();

    //to set color of filter popup icon
    let checkFilterApplied = this.storedFilteredInfo.filter((rec: any) => { if (rec.columnName == this.filterCustomColumnName) { return true } else { return false } }) || [];
    this.popupFilterColor = 'black';
    if (checkFilterApplied.length > 0) {
      this.popupFilterColor = 'red';
    }
  }

  fnCustomFilterSelectAll(event: any) {
    if (event.target.checked) {
      this.customFilterUniqueArray.forEach((rec: any) => {
        rec.checked = true;
      });
    } else {
      this.customFilterUniqueArray.forEach((rec: any) => {
        rec.checked = false;
      });
    }

  }


  fnApplyCustomFilter() {
    this.pTableData = this.fnCustomFilterFromMasterArray(this.pTableData, this.filterCustomColumnName, this.customFilterUniqueArray.filter((rec: any) => rec.checked == true)) || [];
    jQuery("#" + this.pTableSetting["tableID"] + " #filter-icon-" + this.filterCustomColumnName).css('color', 'red');
    jQuery("#" + this.pTableSetting.tableID + "-fitlerInfo").hide();
    if (this.storedFilteredInfo.length > 0) {
      this.storedFilteredInfo = this.storedFilteredInfo.filter((rec: any) => { if (rec.columnName == this.filterCustomColumnName) { return false } else { return true } }) || [];
      this.storedFilteredInfo.push({ columnName: this.filterCustomColumnName, checkedItem: this.customFilterUniqueArray.filter((rec: any) => { if (rec.checked) { return true } else { return false } }) });
    } else {
      this.storedFilteredInfo.push({ columnName: this.filterCustomColumnName, checkedItem: this.customFilterUniqueArray.filter((rec: any) => { if (rec.checked) { return true } else { return false } }) });
    }

    this.setPage(1);

  }

  fnFilterPTableColumn(arg: string) {
    if (this.columnSearchValue.trim() != "") {
      this.customFilterUniqueArray = this.columnWiseMasterData.filter((rec: any) => { if (rec.data.toLowerCase().includes(this.columnSearchValue.toLowerCase())) { return true } else { return false } }) || [];
    } else {
      this.customFilterUniqueArray = JSON.parse(JSON.stringify(this.columnWiseMasterData));
    }

  }

  fnCustomFilterFromMasterArray(masterObject: any[], findKey: any, data: any[]): any[] {
    var o = {}, i, outer: any, l = masterObject.length, filteredData: any = [];
    for (outer = 0; outer < data.length; outer++) {
      let filterMasterData = masterObject.filter((record: any) => record['' + findKey + ''] == data[outer]["data"]) || [];
      filteredData = filteredData.concat(filterMasterData);
    }
    //console.log(filteredData)
    this.filterItemsCheckedAll = true;
    return filteredData;
  }
  
    async fnApplyCustomCustomization() {
    this.pTableSetting.tableColDef.forEach((rec: any) => {
      let columnLooping = this.pTableColumnCustomizationList.filter((record: any) => { if (record.internalName == rec.internalName) { return true } else { return false } }) || [];
      if (columnLooping.length > 0) {
        rec.visible = columnLooping[0].visible;
      } else {
        rec.visible = false;
      }
    });

    //assign again 
    if (this.storedFilteredInfo.length > 0) {
      this.pTableData = JSON.parse(JSON.stringify(this.pTableMasterData)) || [];
      this.storedFilteredInfo.forEach((rec: any) => {
        jQuery("#" + this.pTableSetting["tableID"] + " #filter-icon-" + rec.columnName).css('color', 'white');
      });
      this.storedFilteredInfo = [];
      this.setPage(1);
    }

    //await this.fnShowPreviousFilteredState();   
    this.pTableColumnCustomizationList = JSON.parse(JSON.stringify(this.pTableSetting.tableColDef));
    this.pTableColumnReorder = JSON.parse(JSON.stringify(this.pTableSetting.tableColDef)) || [];
  }
  
   fnPTableColumnCustomizationSearch(searchVal: string) {
    this.pTableColumnCustomizationList = this.pTableSetting.tableColDef.filter((record: any) => { if (record.headerName.toLowerCase().includes(searchVal.toLowerCase())) { return true } else { return false } }) || [];
  }
  
  fnCloseCustomFilter() {
    //jQuery("#fitlerInfo").hide();
    jQuery("#" + this.pTableSetting.tableID + "-fitlerInfo").hide();
  }

  public activeTabName: string = "columnShowHide";
  selectTab(tab: any) {
    this.settingsTabs.forEach((rec: any) => {
      if (rec.tab == tab.tab) {
        rec.active = true;
      } else {
        rec.active = false;
      }
    });
    this.activeTabName = tab.tab;
  }

  fnChangeColumnOrder(colDef: any, index: any, status: string) {
    let old_index = index;
    let new_index: number = 0;
    debugger;
    //to check valid index
    if (index <= 0 && status == 'up') {
      return false;

    } else if (index >= this.pTableColumnReorder.length - 1 && status == 'down') {
      return false;
    }



    if (status == 'up') {
      new_index = index - 1;
    } else {
      new_index = index + 1;
    }

    if (new_index >= this.pTableColumnReorder.length) {
      var k = new_index - this.pTableColumnReorder.length;
      while ((k--) + 1) {
        this.pTableColumnReorder.push(undefined);
      }
    }
    this.pTableColumnReorder.splice(new_index, 0, this.pTableColumnReorder.splice(old_index, 1)[0]);
  }

  fnApplyReorderColumn() {
    this.pTableSetting.tableColDef = JSON.parse(JSON.stringify(this.pTableColumnReorder));
    this.pTableColumnCustomizationList = JSON.parse(JSON.stringify(this.pTableSetting.tableColDef)) || [];
  }

  onDrop(src: any, trg: any) {
    this.fnModeDragDropContent(this.pTableColumnReorder.map(x => x.internalName).indexOf(src.internalName), this.pTableColumnReorder.map(x => x.internalName).indexOf(trg.internalName));

    //myArray.map(x => x.hello).indexOf('stevie')
  }

  fnModeDragDropContent(src: any, trg: any) {
    src = parseInt(src);
    trg = parseInt(trg);

    if (trg >= this.pTableColumnReorder.length) {
      var k = trg - this.pTableColumnReorder.length;
      while ((k--) + 1) {
        this.pTableColumnReorder.push(undefined);
      }
    }
    this.pTableColumnReorder.splice(trg, 0, this.pTableColumnReorder.splice(src, 1)[0]);
    return this; // for testing purposes

  }

  public tempStyle: ptableStyle[] = [];
  

  fnFindUniqueColumnWithCheckedFlag(objectSet: any[], findKey: any, ): any[] {
    var o = {}, i, l = objectSet.length, r = [];
    for (i = 0; i < l; i++) { o[objectSet[i][findKey]] = objectSet[i][findKey]; };
    for (i in o) r.push({ checked: true, data: o[i] });
    return r;
  }
  async clearFilterFromFilterPopup() {
    this.pTableData = JSON.parse(JSON.stringify(this.pTableMasterData));
    if (this.globalSearchValue.trim() != "") {
      await this.fnFilterPTable(this.globalSearchValue, true);
    }
    //to remove filter from storedFilteredInfo variable
    if (this.storedFilteredInfo.length > 0) {
      this.storedFilteredInfo = this.storedFilteredInfo.filter((rec: any) => { if (rec.columnName == this.filterCustomColumnName) { return false } else { return true } }) || [];
    }

    if (this.storedFilteredInfo.length > 0) {
      this.storedFilteredInfo.forEach((rec: any) => {
        this.pTableData = this.fnCustomFilterFromMasterArray(this.pTableData, rec.columnName, rec.checkedItem) || [];
      });
    }

    jQuery("#" + this.pTableSetting["tableID"] + " #filter-icon-" + this.filterCustomColumnName).css('color', 'white');
    jQuery("#" + this.pTableSetting.tableID + "-fitlerInfo").hide();
    this.setPage(1);
  }

  async fnShowPreviousFilteredState() {
    if (this.storedFilteredInfo.length > 0) {
      this.storedFilteredInfo.forEach((rec: any) => {
        this.pTableData = this.fnCustomFilterFromMasterArray(this.pTableData, rec.columnName, rec.checkedItem) || [];
        jQuery("#" + this.pTableSetting["tableID"] + " #filter-icon-" + rec.columnName).css('color', 'red');
      });
    }
    // this.setPage(1);
  }

 fnReflowTable() {
   debugger;
    if (this.pTableSetting.enabledCustomReflow) {
      if (this.customReflowActive) {
        this.customReflowActive = false;
        this.fnResetStyle("retrive");
      } else {
        this.customReflowActive = true;
        this.fnResetStyle("reset");
      }
      this.customReflowFn.emit(this.pTableSetting.tableID);
    } else {
      if (this.activeReflow) {
        jQuery("#" + this.pTableSetting.tableID + "-fitlerInfo").hide();
        this.activeReflow = false;
        this.fnResetStyle("retrive");
      } else {
        this.fnResetStyle("reset");
        this.activeReflow = true;
      }
    }

  }
  
   fnResetStyle(action: string) {
    if (action == "reset") {
      //remove previous style
      //if (this.pTableSetting.pTableStyle.overflowContentWidth != undefined && this.pTableSetting.pTableStyle.overflowContentWidth != null) {
      if (this.pTableSetting.pTableStyle != undefined && this.pTableSetting.pTableStyle != null) {
        this.tempStyle = [{ tableOverflow: this.pTableSetting.pTableStyle.tableOverflow || false, tableOverflowX: this.pTableSetting.pTableStyle.tableOverflowX || false, tableOverflowY: this.pTableSetting.pTableStyle.tableOverflowY || false, overflowContentWidth: this.pTableSetting.pTableStyle.overflowContentWidth || null, overflowContentHeight: this.pTableSetting.pTableStyle.overflowContentHeight || null }];
        this.pTableSetting.pTableStyle.overflowContentWidth = null;
        this.pTableSetting.pTableStyle.tableOverflowY = true;
        this.pTableSetting.pTableStyle.tableOverflow = false;
      }
    }else if(action=="retrive"){
      //to reset previous style
        if (this.tempStyle.length > 0) {
          this.pTableSetting.pTableStyle.overflowContentWidth = this.tempStyle[0].overflowContentWidth;
          this.pTableSetting.pTableStyle.overflowContentHeight = this.tempStyle[0].overflowContentHeight;
          this.pTableSetting.pTableStyle.tableOverflow = this.tempStyle[0].tableOverflow;
          this.pTableSetting.pTableStyle.tableOverflowX = this.tempStyle[0].tableOverflowX;
          this.pTableSetting.pTableStyle.tableOverflowY = this.tempStyle[0].tableOverflowY;
        }

    }

  }

}


export interface IPTableSetting {
  tableID: string | 'P-table-001',
  tableClass?: "table table-border",
  tableName?: "p-table-name",
  enabledSerialNo?: false,
  tableRowIDInternalName?: "Id",
  tableColDef: colDef[],
  enabledSearch?: true,
  enabledCheckbox?: false,
  enabledEditBtn?: false,
  enabledRecordCreateBtn?: false,
  enabledRadioBtn?: false,
  enabledDataLength?: false,
  enabledPagination?: true,
  enabledCellClick?: false,
  enabledColumnResize?: false,
  enabledStaySelectedPage?: false,
  enabledColumnFilter?: false,
  disabledTableReset?: false
  checkboxColumnHeader?: string | 'Select';
  pageSize?: 10,
  displayPaggingSize?: 10,
  radioBtnColumnHeader?: string | 'Select',
  checkboxCallbackFn?: null,
  columnNameSetAsClass?: null,
  enabledColumnSetting?: false,
  enabledReordering?: false,
  tableHeaderFooterVisibility?: boolean | true,
  pTableStyle?: ptableStyle,
  enabledCustomReflow?: boolean | false,
  enabledReflow?: boolean | false,  
  
}

export interface colDef {
  headerName?: string | "",
  width?: string | "",
  internalName?: string,
  className?: string,
  sort?: Boolean | false,
  type?: string,
  onClick?: string | "",
  applyColFilter?: string | "Apply",  
  visible?: boolean | true,
  alwaysVisible: boolean | false
}

export interface ptableStyle {
  tableOverflow?: boolean | false,
  tableOverflowX?: boolean | false,
  tableOverflowY?: boolean | false,
  overflowContentWidth?: string | '',
  overflowContentHeight?: null,

}