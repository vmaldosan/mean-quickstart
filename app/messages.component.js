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
	messages: Message[];
	selectedMsg: Message;
	router: Router;
	messageService: MessageService;

	constructor(
		@Inject(Router) router,
		@Inject(MessageService) messageService) { 

		this.router = router;
		this.messageService = messageService;
	}

	getMessages() {
		this.messageService.getMessages()
		.then(messages => this.messages = messages)
		.catch(error => this.error = error);
	}

	ngOnInit() {
		this.getMessages();
	}
	
	onSelect(message: Message) { this.selectedMsg = message; }
}