import { Component, Input, EventEmitter, Output } from '@angular/core';

import { IrregularVerbModel } from './../irregular-verb.model';

@Component({
  selector: "app-irregular-verb-editor",
  templateUrl: "./irregular-verb-editor.component.html",
})

export class IrregularVerbEditorComponent {
  @Input() verbObject: IrregularVerbModel;
  @Output() notifyAboutEdit: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();
  @Output() notifyAboutDelete: EventEmitter<IrregularVerbModel> = new EventEmitter<IrregularVerbModel>();

  onVerbEdit(): void {
    this.notifyAboutEdit.emit(this.verbObject);
  }

  onVerbDelete(): void {
    this.notifyAboutDelete.emit(this.verbObject);
  }
}
