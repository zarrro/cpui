import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

export enum ControlMode {
  LEGAL_ENTITY_EDIT,
  COMPANY_EDIT,
  READONLY
}

@Component({
  selector: 'app-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.css']
})
export class LegalEntityComponent implements OnInit {

  ControlMode = ControlMode;
  
  @Input() public mode:string;
  @Input() private leControls: FormGroup;
  
  private modalOpened:boolean = false;

  constructor() {
    
    // this.mode = ControlMode.LEGAL_ENTITY_EDIT;
  }

  openSearchModal() {
    console.log("openSearchModal invoked");
    this.modalOpened = true;
  }

  ngOnInit() {
    console.log("mode = " + this.mode);
  }

  public get controls() {
    return this.controls;
  }

}
