import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {MeasureListService} from '../measure-list/measure-list.service';
import {ActivatedRoute} from '@angular/router';
import {IMeasureUnit} from '../../../models/measure-unit';

@Component({
    selector: 'app-measure-type',
    templateUrl: './measure-type.component.html',
    styleUrls: ['./measure-type.component.scss'],
    providers: [MeasureListService],
})
export class MeasureTypeComponent implements OnInit {
    displayedColumns = [ 'default', 'unitName', 'conversionFactor', 'type', 'delete'];
    tableDatabase = new TableDatabase();
    dataSource: MeasurementDataSource | null;
    getId;
    name;
    unitTypeOptions = ['metric', 'imperial'];


  constructor( private cd: ChangeDetectorRef,
               public measurementService: MeasureListService,
               private route: ActivatedRoute) {
      this.getId = (() => {
          let current = 0;
          return () => current += 1;
      })();
  }

  ngOnInit() {
      if (this.route.snapshot.params.id) {
          this.measurementService.getMeasurementById(
              this.route.snapshot.params.id,
              (data) => {
                  this.name = data.measureName;
                  this.tableDatabase.getAllMeasureUnits(data);
              }
          );
      }
      this.dataSource = new MeasurementDataSource(this.tableDatabase);
      setTimeout( () => this.cd.markForCheck());
  }

  addRow() {
      this.tableDatabase.addMeasureUnit('', 'metric');
  }

  toggle(row) {
      this.tableDatabase.toggleRemoved(row);
  }

  save()  {
      const dataWithoutId: IMeasureUnit[] = this.tableDatabase.data;
      if (this.route.snapshot.params.id) {
          this.measurementService.updateMeasurement(
              this.route.snapshot.params.id,
              dataWithoutId,
              this.name,
              () => {
                  this.cd.markForCheck();
              }
          );
      } else {
          this.measurementService.addMeasurement(
              dataWithoutId,
              this.name,
              () => {
                  this.cd.markForCheck();
              }
          );
      }
  }

  updateRow(row, field: string, value) {
      this.tableDatabase.updateMeasureUnit(row, field, value);
      console.log(this.tableDatabase.data);
  }

  checkForDefault(row) {
      this.tableDatabase.toggleDefault(row);
  }
}
export class TableDatabase {
    dataChange: BehaviorSubject<IMeasureUnit[]> = new BehaviorSubject<IMeasureUnit[]>([]);
    get data(): any[] { return this.dataChange.value; }

    constructor() {
    }

    getAllMeasureUnits(data) {
        const copiedData = [...data.measureUnits];
        this.dataChange.next(copiedData);
    }

    addMeasureUnit(unitName: string, unitType?: string, conversionNumber?: number) {
        const copiedData = this.data.slice();
        copiedData.push(this.createUnit(unitName, unitType, conversionNumber));
        this.dataChange.next(copiedData);
    }

    toggleRemoved(row) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index].isRemoved = !copiedData[index].isRemoved;
        this.dataChange.next(copiedData);
    }

    toggleDefault(row) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index].isDefault = true;
        for (const item of copiedData.filter( el => el.unitType === copiedData[index].unitType)) {
            item.isDefault = copiedData.indexOf(item) === index;
        }
        this.dataChange.next(copiedData);
    }

    updateMeasureUnit(row, field: string, value) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index][field] = value;
        this.dataChange.next(copiedData);
    }

    private createUnit( unitName: string,
                        unitType?: string,
                        conversionFactor?: number,
                        isDefault?: boolean,
    )  {
        return {
            unitName,
            unitType,
            conversionFactor,
            isDefault
        };
    }

}

export class MeasurementDataSource extends DataSource<IMeasureUnit>  {
    constructor( private _tableDatabase: TableDatabase) {
        super();
    }
    connect(): Observable<IMeasureUnit[]> {
        return this._tableDatabase.dataChange;
    }
    disconnect() {}
}
