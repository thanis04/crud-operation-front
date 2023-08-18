import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CrudServiceService} from "../../service/crud-service.service";
import {Userdetail} from "../../service/userdetail";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit{

  users: any = [{
    user_name: String,
    password: String,
    full_name: String,
    mobile_no: String,
    nic: String,
    created_date: String,
    updates_date: String
  }];

  constructor(private crudservice: CrudServiceService) {
  }

  ngOnInit() {
    this.crudservice.GetUsers()
      .subscribe((resp) => {
        //console.log(resp)
        this.users = resp
    })
  }


}
