import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/crud-service.service";
import {Userdetail} from "../../service/userdetail";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

    deleteUserForm = new FormGroup({
        username: new FormControl('', [Validators.required],)
    });

    submitted = false
    notSubmittd = false

    constructor(private crudservice: CrudServiceService) {
    }

    deleteUser() {
        this.crudservice.GetUserByName(this.deleteUserForm.value.username).subscribe({
            next: (response: Userdetail) => {
                if (response != null) {
                    this.crudservice.DeleteUser(response.user_name);
                    this.submitted=true
                    console.log("Successfull deleted")
                } else {
                     this.notSubmittd = true
                    console.log("User doesn't exists")
                }
            }
        })
    }
}
