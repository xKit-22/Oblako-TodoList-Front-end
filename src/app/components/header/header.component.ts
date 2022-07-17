import { Component, OnInit } from '@angular/core';
import {FormComponent} from "../form/form.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {});
  }
}
