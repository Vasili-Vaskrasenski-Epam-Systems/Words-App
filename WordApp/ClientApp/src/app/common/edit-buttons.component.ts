import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: "common-edit-buttons",
  templateUrl: "./edit-buttons.component.html",
})

export class CommonEditButtonsComponent {
  @Input() inputObject: any;
  @Output() notifyAboutEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyAboutDelete: EventEmitter<any> = new EventEmitter<any>();

  onEdit(): void {
    this.notifyAboutEdit.emit(this.inputObject);
  }

  onDelete(): void {
    this.notifyAboutDelete.emit(this.inputObject);
  }
}
