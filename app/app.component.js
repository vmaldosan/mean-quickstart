import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: '<h1>{{title}}</h1><h2>Showing {{message}} message!</h2>'
})
export class AppComponent {
	title = "My Angular 2 App";
	message = "first";
}