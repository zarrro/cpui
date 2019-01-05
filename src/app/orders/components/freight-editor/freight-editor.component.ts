import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard } from "@clr/angular";
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Freight } from "../../../domain/freight";
import { Order } from 'src/app/domain/order';
import { ControlMode } from '../legal-entity/legal-entity.component';

enum PointPosType {
  START = "START",
  INTERMEDIATE = "INTERMEDIATE",
  FINAL = "FINAL"
}

enum WizardMode {
  NEW_ORDER = "NEW_ORDER",
  NEW_FREIGHT = "NEW_FREIGHT",
  EDIT_FREIGHT = "EDIT_FREIGHT"  
}

class PointInfo {
  formGroupRef: FormGroup;
  type: PointPosType;
}

@Component({
  selector: 'freight-editor',
  templateUrl: './freight-editor.component.html',
  styleUrls: ['./freight-editor.component.css']
})
export class FreightEditorComponent implements OnInit {

  // add reference to the enum, so it can be used in the template
  // https://stackoverflow.com/questions/35835984/how-to-use-a-typescript-enum-value-in-an-angular2-ngswitch-statement
  PointPosType = PointPosType;
  WizardMode = WizardMode;

  // used in the tamplate
  ControlMode = ControlMode;

  public frieghts:Freight[];
  public order:Order;
  // default is new order
  private mode:WizardMode = WizardMode.NEW_ORDER;

  private customerGroupRef:FormGroup = new FormGroup({});
  //to be used by the wizard. FormArray breaks the wizard generation
  private pointsInfo: PointInfo[];

  @ViewChild("freightWizard") wizard: ClrWizard;

  private wizForm:FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get points(): FormArray {
    return this.wizForm.get('points') as FormArray;
  }

  public addPoint(index: number): void {
    if (this.pointsInfo.length != this.points.length) {
      console.error("Illegal state: points and pointsInfo must be equal size");
      return;
    }

    let p: PointInfo = new PointInfo();
    if (index === 0) {
      p.type = PointPosType.START;
    } else if (this.pointsInfo.length === index) {
      p.type = PointPosType.FINAL;
    } else {
      p.type = PointPosType.INTERMEDIATE;
    }
    p.formGroupRef = this.createPointFormGroup(p.type);
    this.addCompanyEnitityControls(p.formGroupRef);
    this.points.insert(index, p.formGroupRef);
    this.pointsInfo.splice(index, 0, p);
  }

  public removePoint(index: number) {
    if (this.pointsInfo.length != this.points.length) {
      console.error("Illegal state: points and pointsInfo must be equal size");
      return;
    }

    // works only for intermidate points
    if (index > 0 && index < this.pointsInfo.length - 1) {
      if (this.pointsInfo[index].type === PointPosType.INTERMEDIATE) {
        this.points.removeAt(index);
        this.pointsInfo.splice(index, 1); // delete the element at the index
      } else {
        console.error("Illegal state: point index denote intermidite step, but the type is: "
          + this.pointsInfo[index].type);
      }
    } else {
      console.warn("RemovePoint is not expected to be called for non INTERMEDIATE points");
    }
  }

  private addCompanyEnitityControls(group:FormGroup) {
    group.addControl("legalId", new FormControl(''));
    group.addControl("companyType", new FormControl(''));
    group.addControl("isTransport", new FormControl(''));
    group.addControl("isSpedition", new FormControl(''));
    this.addLegalEntityControls(group);
  }
  
  private addLegalEntityControls(group:FormGroup) {
    group.addControl("contactFirstName", new FormControl(''));
    group.addControl("contactLastName", new FormControl(''));
    group.addControl("contactPhone", new FormControl(''));
    group.addControl("companyName", new FormControl(''));
    group.addControl("addressCity", new FormControl(''));
    group.addControl("addressZipCode", new FormControl(''));
    group.addControl("addressLine", new FormControl(''));
  }

  private createPointFormGroup(pointPos: PointPosType): FormGroup {
    let point: FormGroup = this.fb.group({
      loading: [''],
      loadDescription: [''],
      unloading: [''],
      unloadDescription: [''],
      notes: ['']
    })

    let loading: FormControl = point.get('loading') as FormControl;
    let unloading: FormControl = point.get('unloading') as FormControl;

    if (pointPos === PointPosType.START) {
      // start point is always just loading
      loading.setValue(true);
      unloading.setValue(false);
    } else if (pointPos === PointPosType.FINAL) {
      // final point is always unloading
      loading.setValue(false);
      unloading.setValue(true);
    } else {
      loading.setValue(false);
      unloading.setValue(false);
    }

    this.disableControl(!loading.value, point.get('loadDescription') as FormControl);
    loading.valueChanges.subscribe(val => {
      this.disableControl(!val, point.get('loadDescription') as FormControl);
    });


    this.disableControl(!unloading.value, point.get('unloadDescription') as FormControl);
    unloading.valueChanges.subscribe(val => {
      console.log('debug# unloading changes: ' + val);
      this.disableControl(!val, point.get('unloadDescription') as FormControl);
    });
    return point;
  }

  private waitForNewNextPage(before: number, actual: number) {
    if (actual > before) {
      this.wizard.next()
    } else {
      setTimeout(() => {
        this.waitForNewNextPage(before, this.wizard.pages.length);
      }, 200);
    }
  }

  public addPointAndProceed(pointIndex:number) {
    let pageCountBefore = this.wizard.pages.length;
    this.addPoint(pointIndex + 1);

    // calling wizard.next() directly will skip the new page added
    // we need to wait for it
    this.waitForNewNextPage(pageCountBefore, this.wizard.pages.length);
  }

  public removePointAndProceed(pointIndex:number) {
    this.wizard.next();
    this.removePoint(pointIndex);
  }

  public openNewFreightWizard() {
    // to workaround issue that wizard is opened from the 3rd page
    // also, in generel wizard for new freight is expected to be opened in clean state
    this.initFormControls(WizardMode.NEW_FREIGHT);
    this.wizard.reset();
    this.wizard.open();
  }

  public openNewOrderWizard() {
    // to workaround issue that wizard is opened from the 3rd page
    // also, in generel wizard for new freight is expected to be opened in clean state
    this.initFormControls(WizardMode.NEW_ORDER);
    this.wizard.reset();
    this.wizard.open();
  }

  public doFinish() {
    this.wizard.reset();
  }

  public doCancel() {
    if (confirm("Наистина ли искате да затворите диалога? Попълнената информация ще бъде загубена.")) {
      this.wizard.close();
      this.wizard.reset();
    }
  }

  private disableControl(condition: boolean, control: FormControl): void {
    if (condition) {
      control.disable();
    } else {
      control.enable();
    }
  }

  private initFormControls(wizardMode:WizardMode) {
    this.initCommonContols();
    switch(wizardMode) {
      case WizardMode.NEW_ORDER:
        this.customerGroupRef = new FormGroup({});
        this.addCompanyEnitityControls(this.customerGroupRef);
        this.wizForm.addControl("customer", this.customerGroupRef);
        break;
      case WizardMode.NEW_FREIGHT:
        this.mode = WizardMode.NEW_FREIGHT;
      break;
      case WizardMode.EDIT_FREIGHT:
      break;
      default: { 
        console.log("Unsupported wizard mode");
        break; 
     } 
    }
  }

  private initCommonContols() {
    this.pointsInfo = [];
    this.wizForm = this.fb.group({
      freightStartDate: [''],
      freightPrice: [''],
      points: this.fb.array([])
    });

    // by default freight has two points (start and finish)
    // note: when editing existing freight this needs to be skipped
    this.addPoint(0); // the start point
    this.addPoint(1); // the final point
  }

  ngOnInit() {
    this.initFormControls(WizardMode.NEW_ORDER);
  }
}
