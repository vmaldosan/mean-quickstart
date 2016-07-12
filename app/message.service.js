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
			.catch(this._handleError);
	}

	saveMessage(message): Promise<Message>  {
		if (message._id) {
			return this._put(message);
		} 
		return this._post(message);
	}

	_post(message: Message): Promise<Message> {
		let headers = new Headers({
			'Content-Type': 'application/json'});

		return this.http
			.post(this.messagesUrl + '/message', JSON.stringify(message), {headers: headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this._handleError);
	}

	_put(message: Message) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let url = `${this.messagesUrl + '/message'}/${message._id}`;

		return this.http
			.put(url, JSON.stringify(message), {headers: headers})
			.toPromise()
			.then(() => message)
			.catch(this._handleError);
	}

	_handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}