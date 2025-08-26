import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent implements OnInit {
  task!: FormGroup;

  // Task = {
  //   id: 0,
  //   title: '',
  //   description: '',
  //   priority_level: '',
  // };

  constructor(
    private navCtrl: NavController,
    private service: TaskService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.task = this.formBuilder.group({
      id: [0, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      priority_level: ['', [Validators.required]],
    });
  }

  // getters for displaying errors in html file
  get title() {
    return this.task.get('title');
  }
  get description() {
    return this.task.get('description');
  }
  get priority_level() {
    return this.task.get('priority_level');
  }

  closeForm() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  onSubmit() {
    this.service.addtask(this.task.value).subscribe(
      (response) => {
        console.log('Task added!', response);
        this.navCtrl.navigateBack('tabs/tab1');
      },
      (error) => {
        console.error('Error adding task', error);
      }
    );
  }
}
