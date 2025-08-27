import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {
  message!: string;
  apiUrl!: string;

  constructor() {}

  ngOnInit(): void {
    this.message = environment.message;
    this.apiUrl = environment.api_url;
    console.log('Environment: ', environment);
    console.log('Message: ', this.message);
    console.log('API URL: ', this.apiUrl);
  }
}
