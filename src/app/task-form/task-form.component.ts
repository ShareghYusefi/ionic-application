import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  closeForm() {
    this.navCtrl.navigateBack('/tabs/tab1');
  }

  onSubmit() {
    console.log('Form submitted!');
  }
}
