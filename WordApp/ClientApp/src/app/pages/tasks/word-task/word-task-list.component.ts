import { Component, ViewChild,OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';

import { WordTaskService } from './../../../services/tasks/word-task.service';
import { WordsService } from './../../../services/words.service';
import { AlertService } from './../../../alert/alert.service';
import { UserService } from './../../../services/user.service';
import { AssignWordTaskService } from './../../../services/tasks/assign-word-task.service';

import { WordTaskModel } from './../../../models/tasks/words/word-task.model';
import { WordModel } from './../../../models/words/word.model';
import { AssignWordTaskModel } from './../../../models/tasks/words/assign-word-task.model';
import { UserModel } from './../../../models/users/user.model';

import { WordTaskEditorFormComponent } from './word-task-editor-form.component';
import { AssignTaskComponent, AssignableUserModel } from './../common/assign-task.component';

import { EUserType } from './../../../app-enums';
import { Constants } from './../../../app-constants';

@Component(
  {
    selector: 'word-task-list',
    templateUrl: './word-task-list.component.html',
  })
export class WordTaskListComponent implements OnInit {
  public dataSource: MatTableDataSource<WordTaskModel>;
  public displayContent: boolean;
  private existingWords: Array<WordModel>;
  private existingUsers: Array<UserModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private taskService: WordTaskService,
    private wordService: WordsService,
    private alertService: AlertService,
    private userService: UserService,
    private assignWordTaskService: AssignWordTaskService,
    public dialog: MatDialog) {

    this.displayContent = true;
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<WordTaskModel>(result) : new MatTableDataSource<WordTaskModel>();
      this.dataSource.paginator = this.paginator;
    });

    this.wordService.getWords().subscribe(w => {
      this.existingWords = w;
    });

    this.userService.getUsersByType(EUserType[EUserType.Pupil]).subscribe(u => {
      this.existingUsers = u;
    });
  }

  public onShowEditForm(task: WordTaskModel): void {
    var dialogRef = this.dialog.open(WordTaskEditorFormComponent, { data: { task: task, words: this.existingWords } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        task ? this.edit(result as WordTaskModel) : this.create(result as WordTaskModel);
      }
    });
  }
  
  public onShowAssignForm(task: WordTaskModel) {
    var dialogRef = this.dialog.open(AssignTaskComponent, { data: {users: this.existingUsers} });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var assignees = <Array<AssignableUserModel>>result;
        var assignObjects = new Array<AssignWordTaskModel>();

        for (var i = 0; i < assignees.length; i++) {
          assignObjects.push(new AssignWordTaskModel(task,
            assignees[i].user,
            null,
            assignees[i].deadline,
            null,
            null,
            Constants.guidEmpty,
            null));

          this.assignWordTaskService.assignTask(assignObjects).subscribe(s => {
              //todo
            },
            error => this.alertService.error(error));
        }
      }
    });
  }

  public onDelete(task: WordTaskModel): void {
    this.taskService.deleteTask(task).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private create(wordTask: WordTaskModel) {
      this.taskService.createTask(wordTask).subscribe(result => {
        this.dataSource.data.push(result);
        this.resetDataSource();
      },
        error => {
          this.alertService.error(error);
        });
  }

  private edit(wordTask: WordTaskModel) {
    this.taskService.updateTask(wordTask).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.resetDataSource();
      },
      error => console.error(error));
  }
  
  private resetDataSource() {
    this.dataSource = new MatTableDataSource<WordTaskModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
