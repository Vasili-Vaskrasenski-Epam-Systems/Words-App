import { Component, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver, OnInit, AfterViewInit } from '@angular/core';

import { UserService } from './user.service';
import { AlertService } from './../alert/alert.service';

import { UserModel } from './user.model';

import { UserEditorFormComponent } from './user-editor-form.component';

@Component(
  {
    selector: 'user-list',
    templateUrl: './user-list.component.html',
  })

export class UserListComponent implements OnInit, AfterViewInit {

  public users: Array<UserModel>;
  public displayContent: boolean;

  private componentFactory: any;

  @ViewChild('createFormContainer', { read: ViewContainerRef }) createFormContainer: ViewContainerRef;
  @ViewChild('showAddFormBtn') showFormBtn: ElementRef<HTMLButtonElement>;

  constructor(private userService: UserService, private componentFactoryResolver: ComponentFactoryResolver, private alertService: AlertService) {
    if (!this.users) {
      this.users = new Array<UserModel>();
      this.displayContent = true;
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(u => {
      this.users = u;
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
        this.users.push(result);
        this.clearForm();
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
        var index = this.users.findIndex(w => w.id === result.id);

        this.users.splice(index, 1, result);
        this.clearForm();

      }, error => console.error(error));
    });
  }

  onUserDelete(user: UserModel): void {
    this.userService.deleteUser(user).subscribe(result => {
      var index = this.users.findIndex(w => w.id === result.id);
      this.users.splice(index, 1);
    }, error => {
      console.error(error);
    });
  }

  private clearForm() {
    this.createFormContainer.clear();
    this.showFormBtn.nativeElement.disabled = false;
    this.displayContent = true;
  }
}
