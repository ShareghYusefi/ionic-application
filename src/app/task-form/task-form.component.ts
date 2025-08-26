import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    priority_level: '',
  };

  constructor(private navCtrl: NavController, private service: TaskService) {}

  ngOnInit() {}

  closeForm() {
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  onSubmit() {
    this.service.addtask(this.task).subscribe(
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
