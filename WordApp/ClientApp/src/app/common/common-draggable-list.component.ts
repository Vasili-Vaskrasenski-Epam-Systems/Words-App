import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "common-draggable-list",
  templateUrl: "./common-draggable-list.component.html",
  styleUrls: ["./common-draggable-list.component.css"]
})
export class CommonDraggableListComponent {
  @Input() inputObjectArray: Array<CommonDraggableListModel>;
  @Output() notifyAboutDelete: EventEmitter<CommonDraggableListModel>;
  @Output() notifyAboutDrag: EventEmitter<Array<CommonDraggableListModel>>;

  constructor() {
    this.notifyAboutDelete = new EventEmitter<CommonDraggableListModel>();
    this.notifyAboutDrag = new EventEmitter<Array<CommonDraggableListModel>>();
  }

  onDrag(obj: any) {
    var tmp = this.inputObjectArray[obj.previousIndex];
    this.inputObjectArray[obj.previousIndex] = null;
    if (obj.previousIndex > obj.currentIndex) {
      for (var i = obj.previousIndex; i > obj.currentIndex; i--) {
        this.inputObjectArray[i] = this.inputObjectArray[i - 1];
        this.inputObjectArray[i].order = i;
      }

    } else {
      for (var j = obj.previousIndex; j < obj.currentIndex; j++) {
        this.inputObjectArray[j] = this.inputObjectArray[j + 1];
        this.inputObjectArray[j].order = j;
      }
    }
    this.inputObjectArray[obj.currentIndex] = tmp;
    this.inputObjectArray[obj.currentIndex].order = obj.currentIndex;

    this.notifyAboutDrag.emit(this.inputObjectArray);
  }

  onRemoveElement(obj: CommonDraggableListModel) {
    var index = this.inputObjectArray.findIndex(e => e === obj);
    this.inputObjectArray.splice(index, 1);
    this.notifyAboutDelete.emit(obj);
  }
}

export class CommonDraggableListModel {
  public order: number;
  public key: any;
  public value: string;

  constructor(order: number, key: any, value: string) {
    this.order = order;
    this.key = key;
    this.value = value;
  }
}
