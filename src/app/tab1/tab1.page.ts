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

  delete(id: number) {
    this.service.deletetask(id).subscribe((response) => {
      console.log('Task deleted!', response);
      // update front end by removing task from tasks array
      this.tasks = this.tasks.filter((task) => task.id !== response.id);
    });
  }

  openForm() {
    this.navCtrl.navigateForward('/tabs/task-form');
  }
}
