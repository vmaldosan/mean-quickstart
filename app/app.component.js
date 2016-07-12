import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AboutComponent } from './about.component';
import { MessagesComponent } from './messages.component';
import { MessageService } from './message.service';

@Component({
	selector: 'my-app',
	template: `
		<h1>{{title}}</h1>
		<nav>
			<a [routerLink]="['Messages']">Messages</a>
			<a [routerLink]="['About']">About</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['styles/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS,
		MessageService
	]
})

@RouteConfig([
	{
		path: '/messages',
		name: 'Messages',
		component: MessagesComponent,
		useAsDefault: true
	},
	{
		path: '/about',
		name: 'About',
		component: AboutComponent
	}
])

export class AppComponent {
	title = 'Forum App';
}
