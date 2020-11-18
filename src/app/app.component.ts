import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Todo } from './todo';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-todoApp';
  @Input() max: any;
  form: FormGroup;
  todoValues = [];
  tomorrow = new Date(); 

  constructor(private fb: FormBuilder) {
    this.tomorrow.setDate(this.tomorrow.getDate() + 1);
   }

  ngOnInit() {
    this.form = this.fb.group({
      task: this.fb.control('', [Validators.required]),
      priority: this.fb.control('', [Validators.required]),
      dueDate: this.fb.control('', [Validators.required]),
      todos: new FormArray([]),
    });
  }

  addTodo(){
    console.log("add todo");
    const todosWithChkArray: FormArray = this.form.get('todos') as FormArray;
    console.log(this.form.value.task);
    let taskId = uuidv4();
    let singleTodo = new Todo(this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId)
    this.todoValues.push(singleTodo);
    const todoGroup = this.fb.group({
      task: this.fb.control(false)
    })
    todosWithChkArray.push(todoGroup);
    this.form.get('task').reset();
    this.form.get('priority').reset();
    this.form.get('dueDate').reset();
    localStorage.setItem(taskId,JSON.stringify(singleTodo));
  }

  onDelete(index, taskId){
    const todosWithChkArray: FormArray = this.form.get('todos') as FormArray;
    console.log(index);
    console.log(taskId);
    todosWithChkArray.removeAt(index)
    const tobeDeleteTaskIdx = this.todoValues.indexOf(index, 0);
    if (index > -1) {
      this.todoValues.splice(tobeDeleteTaskIdx, 1);
    }
    localStorage.removeItem(taskId);
  }

  onUpdate(index, taskId){

  }

  updateTodoStatus(index){
    this.todoValues[index].status = true;
  }
}
