import { Component, ViewChild, OnInit } from '@angular/core';

import { UserService } from './../../services/users/user.service';
import { AlertService } from './../../alert/alert.service';

import { UserModel } from './../../models/users/user.model';

import { UserEditorFormComponent } from './user-editor-form.component';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { CommonLoadingComponent } from './../../common/common-loading.component';

@Component(
  {
    selector: 'user-list',
    templateUrl: './user-list.component.html',
  })

export class UserListComponent implements OnInit {

  public dataSource: MatTableDataSource<UserModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog, private alertService: AlertService) {
    this.dialog.open(CommonLoadingComponent, { disableClose: true });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<UserModel>(result) : new MatTableDataSource<UserModel>();
      this.dataSource.paginator = this.paginator;
      this.dialog.closeAll();
    },
      error => {this.dialog.closeAll(); console.log(error)});
  }

  public onShowEditorForm(user: UserModel) {
    var dialogRef = this.dialog.open(UserEditorFormComponent, user ? { data: user } : null);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        user ? this.edit(result as UserModel) : this.create(result as UserModel);
      }
    });
  }

  private create(user: UserModel): void {
    this.userService.createUser(user).subscribe(result => {
      this.dataSource.data.push(result);
      this.resetDataSource();
      this.alertService.success("User successfully created");
    }, error => {
      this.alertService.error(error);
    });
  }

  private edit(user: UserModel): void {
    this.userService.updateUser(user).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1, result);
      this.resetDataSource();
    }, error => console.error(error));
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onDelete(user: UserModel): void {
    this.userService.deleteUser(user).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<UserModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }
}
