import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Userdetail} from "../../service/userdetail";
import {CrudServiceService} from "../../service/crud-service.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

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

  updateForm = new FormGroup({
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

  get f() {
    return this.updateForm.controls
  }

  updateUser(): void {
    // this.userdetail.user_name = this.updateForm.value.username!;
    this.userdetail.password = this.updateForm.value.password!;
    this.userdetail.full_name = this.updateForm.value.fullname!;
    this.userdetail.nic = this.updateForm.value.nic!;
    this.userdetail.mobile_no = this.updateForm.value.mobilenumber!;
    this.userdetail.created_date = this.updateForm.value.createddate!;
    this.userdetail.updates_date = this.updateForm.value.updateddate!;


    this.crudservice.GetUserByName(this.updateForm.value.username)
        .subscribe({
          next: (res: Userdetail) => {
            if (this.updateForm.value.username == res.user_name) {
              this.crudservice.AddUser(this.userdetail)
                .subscribe({
                  next: (res) => {
                  },
                  error: (e) => console.error(e)
                });
              this.submitted = true;
            } else {
              this.notSubmitted = true
            }
          }
        })
  }

  search() {
    this.crudservice.GetUserByName(this.updateForm.value.username).subscribe({
      next: (response: Userdetail) => {
        console.log(response)

        if(response != null) {
          this.userdetail.password = response.password
          this.userdetail.full_name = response.full_name
          this.userdetail.mobile_no = response.mobile_no
          this.userdetail.nic = response.nic
          this.userdetail.created_date = response.created_date
          this.userdetail.updates_date = response.updates_date
        } else {
          this.notSubmitted = true
        }
      }
    })
  }
}
