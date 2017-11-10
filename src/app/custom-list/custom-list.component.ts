import { Component, OnInit, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { AppService } from '../providers/custom-list.service'
import { Subscription } from 'rxjs/Subscription';
import { DxDataGridComponent, DxDataGridModule } from "devextreme-angular";

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.css'],
  host: { '(window:keyup)': 'pressKeyUp($event)' }
})

export class CustomListComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  shrink: any;
  currentRow: number;
  currentRowClick: number;
  targetRow: number;
  manulist: any = []; //all menus are stored.
  listwidth: any;
  subscriptions: Subscription;
  visiblelist: any;
  menucaption: any;
  customlist: any = []; //all types of list store.

  selectSingleRow(key, preserve) {
    if (!this.dataGrid.instance.isRowSelected(key)) {
      this.dataGrid.instance.selectRows([key], preserve);
    }
  }
  onContentReadyHandler(e) {
    // Selects the first visible row
    e.component.selectRowsByIndexes([0]);
    
    //e.component.selectRowByVisibleIndex([0]);

  }

  constructor(private appService: AppService, private renderer: Renderer) {
    this.visiblelist = true;
    this.subscriptions = this.appService.filterOn('get:menu:data').subscribe(d => {
      if (d.error) {
        console.log(d.error);
      } else {
        this.getListValue(eval(d.data.GetJsonDataForJScriptResult));
      }
    });
    //-------------------------------------
  }

  getRecrods(Json) {
    this.appService.getValues().subscribe(value => {
      this.customlist = value;
    });
  }
  ngOnInit() {
    this.listwidth = 20;
    this.currentRow = 0;
    //this.appService.setGlobalVariables('servicePath', '192.168.3.107:6161')
    this.appService.setGlobalVariables('servicePath', 'fr.rancelab.com:6171')
    let qry = "Select MenuCaption from (SELECT M.* FROM MenuChild AS M LEFT JOIN (SELECT DesignationID, applicationID, applicationWeight FROM DesignationChild UNION ALL SELECT DesignationID,0, 8 FROM DesignationMaster) AS D ON M.applicationID = D.applicationID INNER JOIN (SELECT DesignationID FROM UserMaster WHERE UserID = 1) AS U ON U.DesignationID = D.DesignationID WHERE D.applicationWeight = 8 ) x WHERE x.MenuCaption <>'' and FormTag != '' order by  x.MenuCaption";
    this.appService.httpPost('get:menu:data', { queryString: qry }, 'GetJsonDataForJScript');
  }

  private getListValue(manulist) {
    this.menucaption = manulist.filter(x => x.MenuCaption != "Exit" && x.FormTag != '');
    this.visiblelist = true;
  }

  private selectedListItem() {
    this.currentRowClick = this.dataGrid.instance.getRowIndexByKey(this.dataGrid.instance.getSelectedRowKeys()[0]);
  }

  //--------------------------------------Arrow up down code-------------------------
  private selectNextRow() {
    this.dataGrid.instance.clearSelection();
    this.shiftRowSelection(1)
  }

  private selectPreviousRow() {
    if (this.currentRow > 0) {
      this.dataGrid.instance.clearSelection();
      this.shiftRowSelection(-1)
    }
  }
  private shiftRowSelection(shiftrowcount) {
    if (this.currentRowClick > 0) {
      this.targetRow = (this.currentRowClick + shiftrowcount);
      this.currentRowClick = this.targetRow;
      this.dataGrid.instance.selectRowsByIndexes([this.currentRowClick]);
    }
    else {
      this.targetRow = (this.currentRow + shiftrowcount);
      this.currentRow = this.targetRow;
      this.dataGrid.instance.selectRowsByIndexes([this.targetRow]);
    }
  }



  private pressKeyUp(event) {
    if (event.keyCode == 38) {
      this.selectPreviousRow();
    }
    else if (event.keyCode == 40) {
      this.selectNextRow();
    }
    else if (event.keyCode == 13) {
      console.log(this.dataGrid.selectedRowKeys[0]); //
    }

  }
  //--------------------------------------End Arrow up down code-------------------------
  ngAfterViewInit() {
    document.getElementById('gridContainer').click();
    }


  private clickOKBtn() {
    console.log(this.dataGrid.selectedRowKeys[0]);
  }
  private clickExitBtn() {
    this.visiblelist = false;
  }

}


//this.dataGrid.instance.getScrollable();

     // this.dataGrid.selection.selectRowByVisibleIndex;

      // this.dataGrid.instance.registerKeyHandler("arrowkeyup", function (e) {
      //   console.log('presskeyup');
      // });

     // this.dataGrid.instance.getScrollable().scrollTo(this.targetRow * 10);


      //this.renderer.listenGlobal('window', 'scroll', (event) => { 
       // this.shrink = (event.pageY>20 ? 'active' : 'inactive');
        //this.dataGrid.instance.getScrollable().scrollTo(this.shrink);
        // });

      // this.dataGrid.instance.getScrollable().scrollTo(this.currentRow * 15);

      // let pgSize = this.dataGrid.instance.pageSize();
      // let pageIndex = Math.floor(this.targetRow / pgSize) + ((this.targetRow % pgSize) ? 0 : -1);
      // this.dataGrid.instance.pageIndex(pageIndex);

      //this.dataGrid.instance.
      //console.log( this.dataGrid.instance.getScrollable().scrollTo(this.currentRow));
      // this.dataGrid.onRowInserted.getScrollable().scrollTo(this.currentRow); //  scrollTo(this.currentRow);
  //   }
  // }

  //this.dataGrid.instance.registerKeyHandler("downArrow",downArrow);
  // registerKeyHandlers () {
  //   this.dataGrid.instance.registerKeyHandler("downArrow", function (e) {
  //     console.log(e + 'downArrow');
  //   });
  //   this.dataGrid.instance.registerKeyHandler("upArrow", function (e) {
  //     console.log(e + 'upArrow');
  //   });
  // }

  // (registerKeyHandler)="registerKeyHandler()" //html