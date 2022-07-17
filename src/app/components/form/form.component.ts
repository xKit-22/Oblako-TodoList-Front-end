import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../entities/project";
import {TodoService} from "../../services/todo.service";
import {switchMap} from "rxjs";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  projects: Project[]
  isNewProject: boolean = false


  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    private fb: FormBuilder,
    private todoService: TodoService
  ) {}

  ngOnInit() {
  this.todoService.getProjects().subscribe((projects) => {
    this.projects = projects

  })
    this.initForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.form = this.fb.group({
      text: [null, Validators.required],
      project: [null, Validators.required],
      title: [null]
    });
    this.form.valueChanges.subscribe((res) => {
      this.isNewProject = res.project === '-1';
    })
  }


  createTodo() {
    this.todoService.createTodo(this.form.value.project, this.form.value.text).subscribe(() => {
      this.todoService.updateProjectsEvent.next()
      this.onNoClick()
    })
  }

  createProject() {
    this.todoService.createProject(this.form.value.title)
      .pipe(switchMap((project) => this.todoService.createTodo(project.id, this.form.value.text)))
      .subscribe(() => {
        this.todoService.updateProjectsEvent.next()
        this.onNoClick()
      })
  }


}
