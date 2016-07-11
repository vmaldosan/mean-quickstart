import { Component, OnInit, Inject } from '@angular/core';

import { Message } from './message';
import { MessageService } from './message.service';

@Component({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<ul class="messages">
			<li *ngFor="let message of messages"
				[class.selected]="message === selectedMessage"
				(click)="onSelect(message)">
				<span class="subject">{{message.subject}}</span>
				<span class="created">{{message.created}}</span>
				<span>{{message.content}}</span>
			</li>
		</ul>
	`,
	styles: [`
		.selected {
			background-color: #CFD8DC !important;
			color: white;
		}
		.messages {
			margin: 0 0 2em 0;
			list-style-type: none;
			padding: 0;
		}
		.messages li {
			cursor: pointer;
			position: relative;
			left: 0;
			background-color: #EEE;
			margin: .5em;
			padding: .3em 0;
			border-radius: 4px;
			width: 60%;
			padding: 0.5em 0.7em 0.5em 0.7em;
		}
		.messages li.selected:hover {
			background-color: #BBD8DC !important;
			color: white;
		}
		.messages li:hover {
			color: #607D8B;
			background-color: #DDD;
			left: .1em;
		}
		.messages .text {
			position: relative;
			top: -3px;
		}
		.messages .subject {
			display: inline-block;
			font-size: small;
			color: white;
			padding: 0.5em 1em 0.5em 0.7em;
			background-color: #607D8B;
			line-height: 1em;
			position: relative;
			left: -11px;
			top: -7px;
			margin-right: .8em;
			border-radius: 4px 4px 0 0;
			width: 100%;
		}
		.messages .created {
			font-size: small;
			font-style: italic;
			display: block;
		}
	`],
	providers: [MessageService]
})
export class AppComponent implements OnInit {
	title = 'My Forum App';
	messages: Message[];
	selectedMsg: Message;
	messageService: MessageService;

	constructor(@Inject(MessageService) messageService) { 
		this.messageService = messageService;
	}

	getMessages() {
		this.messageService.getMessages().then(data => this.messages = data);
	}

	ngOnInit() {
		this.getMessages();
	}
	
	onSelect(message: Message) { this.selectedMsg = message; }
}