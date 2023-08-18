import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CrudServiceService} from "../../service/crud-service.service";
import {Userdetail} from "../../service/userdetail";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  submitted = false

  constructor(private router: Router, private crudservice: CrudServiceService) {
  }

  goToTable() {

      this.crudservice.loginUser(this.loginForm.value.username, this.loginForm.value.password)
          .subscribe(resppnse => {
            if(resppnse) {
              console.log("Login succsess")
              this.router.navigate(['/user/table'])
            } else {
              console.log("Login not succsess")
              this.submitted=true
            }
          })

     /* if (this.crudservice.loginUser(this.loginForm.value.username, this.loginForm.value.password)) {
          this.router.navigate(['/user/table'])
      }*/

      /*this.crudservice.GetUserByName(this.loginForm.value.username).subscribe({
        next: (response: Userdetail) => {
          if (response != null) {
            if (this.loginForm.value.password == response.password) {
              this.router.navigate(['/user/table']);
            } else {
              // console.log("Password invalid")
              this.submitted=true
            }
          } else {
            // console.log("Username does not exists")
            this.submitted=true
          }

        },
        error:err => {
          console.error(err)
        }
      });*/
  }

  get f() {
    return this.loginForm.controls
  }

}
