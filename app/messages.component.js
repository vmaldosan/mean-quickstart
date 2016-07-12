import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Message } from './message';
import { MessageService } from './message.service';

@Component({
	selector: 'my-messages',
	templateUrl: 'views/messages.component.html',
	styleUrls: ['styles/messages.component.css']
})

export class MessagesComponent implements OnInit {
	title = "Messages board"
	messages: Message[];
	selectedMessages: Message[];
	router: Router;
	messageService: MessageService;
	showEditDiv: Boolean;
	message2edit: Message;
	error: any;

	constructor(
		@Inject(Router) router,
		@Inject(MessageService) messageService) { 

		this.router = router;
		this.messageService = messageService;
		this.selectedMessages = new Set();
		this.message2edit = new Message();
	}

	getMessages() {
		this.messageService.getMessages()
		.then(messages => this.messages = messages)
		.catch(error => this.error = error);
	}

	ngOnInit() {
		this.getMessages();
	}
	
	isSelected(msg) {
		if (!this.selectedMessages) return false;
		return this.selectedMessages.has(msg);
	}

	onSelect(message: Message) {
		// Do nothing if we are editing a message.
		if (this.showEditDiv) {
			return;
		}
		if (this.selectedMessages.has(message)) {
			this.selectedMessages.delete(message);
		} else {
			this.selectedMessages.add(message); 
		}
	}

	onEdit() {
		this.showEditDiv = true;
		this.message2edit = this.selectedMessages.values().next().value;
	}

	save() {
		this.message2edit.updated = new Date();
		this.messageService.saveMessage(this.message2edit)
			.catch(error => {
				this.error = error;
				console.error(error);
			});
		this.showEditDiv = false;
		this.getMessages();
	}

	cancelEdit() {
		this.showEditDiv = false;
	}

	onNew() {
		this.selectedMessages.clear();
		this.message2edit.subject = '';
		this.message2edit.content = '';
		this.showEditDiv = true;
	}
}