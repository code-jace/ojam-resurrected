import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ojam-client';
  private socket = io('http://localhost:3000');
  list: string[] = [];
  newItem:string = '';

  constructor() {
    this.socket.on('listUpdated', (updatedList: string[]) => {
      this.list = updatedList;
    });
  }

  addItem() {
    if (this.newItem.trim() !== '') {
      this.list.push(this.newItem);
      this.newItem = '';
      this.socket.emit('updateList', this.list);
    }
  }
}

