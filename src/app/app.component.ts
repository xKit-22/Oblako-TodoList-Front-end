import { Component } from '@angular/core';
import {Project} from "./entities/project";
import {TodoService} from "./services/todo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oblako-todos-front';
  projects: Project[]
  constructor(private todoService: TodoService) { }

  ngOnInit() {
   this.loadProjects()
    this.todoService.updateProjectsEvent.subscribe(() => this.loadProjects())
  }

  loadProjects() {
    this.todoService.getProjects().subscribe((projects) => {
      this.projects = projects

    })
  }
}
