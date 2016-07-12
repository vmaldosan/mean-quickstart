import { Injectable, Inject }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Message } from './message';

@Injectable()
export class MessageService {

	messagesUrl = 'api/v1'; // URL to web api
	http: Http;

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	getMessages(): Promise < Message[] > {
		return this.http.get(this.messagesUrl + '/messages')
			.toPromise()
			.then(response => response.json())
			.catch(this.handleError);
	}
}