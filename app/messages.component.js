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
	selectedMessages: String[];
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
	
	isSelected(id) {
		if (!this.selectedMessages) return false;
		return this.selectedMessages.has(id);
	}

	onSelect(id: String) {
		// Do nothing if we are editing a message.
		if (this.showEditDiv) {
			return;
		}
		if (this.selectedMessages.has(id)) {
			this.selectedMessages.delete(id);
		} else {
			this.selectedMessages.add(id); 
		}
	}

	onEdit() {
		this.showEditDiv = true;
		let id2edit = this.selectedMessages.values().next().value;
		for (let msg of this.messages) {
			if (msg._id === id2edit) {
				this.message2edit = msg;
				break;
			}
		}
	}

	save() {
		this.message2edit.updated = new Date();
		this.messageService.saveMessage(this.message2edit)
			.catch(error => {
				this.error = error;
				console.log(error);
			});
		this.showEditDiv = false;
		this.getMessages();
	}

	cancelEdit() {
		this.showEditDiv = false;
	}

	onNew() {
		this.selectedMessages.clear();
		this.message2edit._id = '';
		this.message2edit.subject = '';
		this.message2edit.content = '';
		this.showEditDiv = true;
	}

	onDelete() {
		if (confirm("Please confirm you want to delete the selected " + (this.selectedMessages.size > 1 ? this.selectedMessages.size + " messages" : "message"))) {
			this.messageService.deleteMessages(this.selectedMessages);
			this.getMessages();
		}
	}
}