import { Component } from '@angular/core';
import {Userdetail} from "../../service/userdetail";
import {CrudServiceService} from "../../service/crud-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  userdetail: Userdetail = {
    user_name: '',
    password: '',
    full_name: '',
    mobile_no: '',
    nic: '',
    created_date: '',
    updates_date: ''
  }

  submitted = false
  notSubmitted = false

  addUserDetailForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
    ]),
    fullname: new FormControl('', [Validators.minLength(8)]),
    mobilenumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern("^[0-9]*$")
    ]),
    nic: new FormControl('', [
      Validators.required
    ]),
    createddate: new FormControl(''),
    updateddate: new FormControl('')
  })

  constructor(private crudservice: CrudServiceService) {
  }

  saveUser(): void {

    this.userdetail.user_name = this.addUserDetailForm.value.username!;
    this.userdetail.password = this.addUserDetailForm.value.password!;
    this.userdetail.full_name = this.addUserDetailForm.value.fullname!;
    this.userdetail.nic = this.addUserDetailForm.value.nic!;
    this.userdetail.mobile_no = this.addUserDetailForm.value.mobilenumber!;
    this.userdetail.created_date = this.addUserDetailForm.value.createddate!;
    this.userdetail.updates_date = this.addUserDetailForm.value.updateddate!;

    this.crudservice.AddUser(this.userdetail)
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log("sign-up successful")
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  get f() {
    return this.addUserDetailForm.controls
  }
}
