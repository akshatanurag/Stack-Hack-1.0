export class User {
	constructor(public name: string, public email: string, public id: string, public email_status: boolean,private _token: string, private _tokenExp: Date) { }

	get token() {
		if (!this._tokenExp || new Date() > this._tokenExp) {
			return null;
		}
		return this._token;
	}
}