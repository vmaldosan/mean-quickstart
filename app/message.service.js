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

	getMessages(): Promise <Message[]> {
		return this.http.get(this.messagesUrl + '/messages')
			.toPromise()
			.then(response => response.json())
			.catch(this._handleError);
	}

	saveMessage(message): Promise<Message> {
		if (message._id) {
			return this._put(message);
		} 
		return this._post(message);
	}

	deleteMessages(ids: String[]): Promise<String[]> {
		let deletedMessages = new Array();
		for (let id of ids) {
			deletedMessages.push(this._delete(id));
		}
		return deletedMessages;
	}

	_post(message: Message): Promise<Message> {
		let headers = new Headers({ 'Content-Type': 'application/json' });

		return this.http
			.post(this.messagesUrl + '/message', JSON.stringify(message), {headers: headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this._handleError);
	}

	_put(message: Message) {
		let headers = new Headers({ 'Content-Type': 'application/json' });

		let url = `${this.messagesUrl + '/message'}/${message._id}`;

		return this.http
			.put(url, JSON.stringify(message), {headers: headers})
			.toPromise()
			.then(() => message)
			.catch(this._handleError);
	}

	_delete(id: String): Promise<Object> {
		let headers = new Headers({ 'Content-Type': 'application/json' });

        let url = `${this.messagesUrl + '/message'}/${id}`;

		return this.http
			.delete(url)
			.toPromise()
			.then(() => id)
			.catch(this._handleError);
	}

	_handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error('An error occurred', errMsg);
		return Promise.reject(errMsg);
	}
}