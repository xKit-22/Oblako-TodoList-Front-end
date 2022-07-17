import {Component, Input, OnInit} from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {Project} from "../../entities/project";
import {SERVER_URL} from "../../services/server.config";
import {HttpClient} from "@angular/common/http";
import {Todo} from "../../entities/todo";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  todos: Todo[] = []
  @Input()
  project: Project
  @Input()
  todo: Todo

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.project.todos
  }

  todoComplete(todo: Todo, event: any) {
    todo.isCompleted = event.checked
    this.todoService.updateTodo(todo, this.project.id).subscribe()
  }

  method(event:any) {
    console.log(event)
  }
}
