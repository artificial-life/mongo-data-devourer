"use strict"

var argv = require('minimist')(process.argv.slice(2));

const _ = require('lodash');
const nats_url = "nats://" + (argv.nats || "127.0.0.1:4222");
const nats = require('nats').connect({
	'url': nats_url
});

class workerWrap {
	constructor(Model, settings = {}) {
		let exposed = settings.exposed || [];
		this.obj = new Model();

		_.forEach(exposed, ({
			action,
			method
		}) => {
			let boundMethod = this.obj[method].bind(this.obj);
			nats.subscribe(action, (data, replyTo) => boundMethod(data).then(result => nats.publish(replyTo, result)));
		});
	}
	expose(action, method) {
		return method ? this._expose(action) : this._expose({
			action,
			method
		});
	}
	_expose(def) {
		let data = _.castArray(def);
		_.forEach(data, ({
			action,
			method
		}) => {
			let boundMethod = this.obj[method].bind(this.obj);
			nats.subscribe(action, (data, replyTo) => boundMethod(data).then(result => nats.publish(replyTo, result)));
		});

		return this;
	}

}

module.exports = workerWrap;
