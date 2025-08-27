import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task-service';
import { Task } from '../interfaces/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.task = this.formBuilder.group({
      id: [0, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      priority_level: ['', [Validators.required]],
    });

    // get id of task from url
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      // if id exists, get task data from database
      if (id) {
        this.service.gettask(parseInt(id)).subscribe(
          (response: Task) => {
            console.log('Get Task: ', response);
            //update form with task data
            this.task.patchValue({
              id: response.id,
              title: response.title,
              description: response.description,
              priority_level: response.priority_level,
            });
          },
          (error) => {
            console.error('Error getting Task from server.', error);
          }
        );
      }
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

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    message: string,
    duration: number,
    color?:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'success'
      | 'warning'
      | 'danger'
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      color: color,
    });

    await toast.present();
  }

  onSubmit() {
    // check if form is valid
    if (this.task.invalid) {
      return;
    }

    // check for id in route params
    let id = this.route.snapshot.paramMap.get('id');
    // if id is truthy, update task
    if (id) {
      this.service.updatetask(parseInt(id), this.task.value).subscribe(
        (response) => {
          this.presentToast('top', 'Task updated!', 2000, 'success');
          this.task.reset();
          this.navCtrl.navigateBack('tabs/tab1');
        },
        (error) => {
          console.error('Error adding task', error);
        }
      );
    } else {
      this.service.addtask(this.task.value).subscribe(
        (response) => {
          this.presentToast('top', 'Task added!', 2000, 'success');
          this.task.reset();
          this.navCtrl.navigateBack('tabs/tab1');
        },
        (error) => {
          console.error('Error adding task', error);
        }
      );
    }
  }
}
