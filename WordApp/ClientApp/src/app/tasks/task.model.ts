export class TaskModel {
  name: string;
  taskType: string;
  id: string;
  rowVersion: string;

  constructor(name: string, type: string, id: string, rowVersion: string) {
    this.name = name;
    this.taskType = type;
    this.id = id;
    this.rowVersion = rowVersion;
  }
}
