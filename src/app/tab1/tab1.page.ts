import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Task } from '../interfaces/task';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  tasks!: Task[];

  constructor(private navCtrl: NavController, private service: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  
  ionViewDidEnter() {
    this.loadTasks();
  }

  loadTasks() {
    this.service.gettasks().subscribe((response) => {
      this.tasks = response;
    });
  }

  openForm() {
    this.navCtrl.navigateForward('/tabs/task-form');
  }
}
