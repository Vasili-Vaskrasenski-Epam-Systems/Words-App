import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { UserService } from './user.service';
import { AlertService } from './../alert/alert.service';

import { UserModel } from './user.model';

import { UserEditorFormComponent } from './user-editor-form.component';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component(
  {
    selector: 'user-list',
    templateUrl: './user-list.component.html',
  })

export class UserListComponent implements OnInit, AfterViewInit {

  public dataSource: MatTableDataSource<UserModel>;
  public displayContent: boolean;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private componentFactoryResolver: ComponentFactoryResolver, private alertService: AlertService) {
      this.displayContent = true;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(result => {
      this.dataSource = result ? new MatTableDataSource<UserModel>(result) : new MatTableDataSource<UserModel>();
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserEditorFormComponent);
  }

  onShowCreateForm(): void {
    this.showFormBtn.nativeElement.disabled = true;
    this.displayContent = false;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <UserEditorFormComponent>ref.instance;

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.userService.createUser(e).subscribe(result => {
        this.dataSource.data.push(result);
        this.resetDataSource();
        this.clearForm();
        this.alertService.success("User successfully created");
      }, error => {
        this.alertService.error(error);
      });
    });
  }

  onShowEditForm(user: UserModel): void {
    this.displayContent = false;
    this.showFormBtn.nativeElement.disabled = true;

    var ref = this.createFormContainer.createComponent(this.componentFactory);
    var instance = <UserEditorFormComponent>ref.instance;

    instance.setEditableObject(user);

    instance.notifyAboutCancel.subscribe(e => {
      this.clearForm();
    });

    instance.notifyAboutConfirm.subscribe(e => {
      this.userService.updateUser(e).subscribe(result => {
        var index = this.dataSource.data.findIndex(w => w.id === result.id);
        this.dataSource.data.splice(index, 1, result);
        this.resetDataSource();
        this.clearForm();

      }, error => console.error(error));
    });
  }

  onUserDelete(user: UserModel): void {
    this.userService.deleteUser(user).subscribe(result => {
      var index = this.dataSource.data.findIndex(w => w.id === result.id);
      this.dataSource.data.splice(index, 1);
      this.resetDataSource();
    }, error => {
      console.error(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private resetDataSource() {
    this.dataSource = new MatTableDataSource<UserModel>(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
