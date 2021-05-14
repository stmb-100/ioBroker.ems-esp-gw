'use strict';

/*
 * Created with @iobroker/create-adapter v1.33.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');
var request = require('request');
const axios = require('axios');
const path = '' ;
var obj = '';
var obj2 = '';

// Load your modules here, e.g.:
// const fs = require("fs");

class EmsEspGw extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: 'ems-esp-gw',
		});
		this.on('ready', this.onReady.bind(this));
		this.on('stateChange', this.onStateChange.bind(this));
		// this.on('objectChange', this.onObjectChange.bind(this));
		// this.on('message', this.onMessage.bind(this));
		this.on('unload', this.onUnload.bind(this));
        
		this.killTimeout = null;
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() 
	{
		// Initialize your adapter here

		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:
		this.log.info('config option1: ' + this.config.option1);
		this.log.info('config option2: ' + this.config.option2);
		this.log.info('config option3: ' + this.config.option3);
		this.log.info('config option4: ' + this.config.option4);
		this.log.info('config option5: ' + this.config.option5);
		this.log.info('config input1: ' + this.config.input1);
		this.log.info('config input2: ' + this.config.input2);
		
		var configIPAdr = this.config.input1;
		var configIPPort = this.config.input2;

		this.log.debug(configIPAdr);
		this.log.debug(configIPPort);

		var options = {
			url: "http://" + configIPAdr + "/api?device=dallassensor&cmd=info",
			json: true
		};
		
		this.log.info(options.url);
		this.log.info(options.json);

		if (this.config.option1 == true){
			this.log.info('get System Data');			

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=system&cmd=info',
				responseType: 'json'
			}).then(
				async (response) => {
					const content = response.data;

					this.log.info('local request done');
					this.log.info(JSON.stringify(content));
					this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					await this.setObjectNotExistsAsync(path + 'responseCode', {
						type: 'sensor1',
						common: {
							name: 'responseCode',
							type: 'number',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
					
					this.setState(path + 'responseCode', {val: response.status, ack: true});
				}
				).catch(
                    (error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code

                            this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js<div></div>
                            this.log.error(error.message);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            this.log.error(error.message);
                        }
                    }
                );

		}

		if (this.config.option2 == true){
			this.log.info('get Boiler Data');			

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=boiler&cmd=info',
				responseType: 'json'
			}).then(
				async (response) => {
					const content = response.data;

					this.log.info('local request done');
					this.log.info(JSON.stringify(content));
					this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					await this.setObjectNotExistsAsync(path + 'responseCode', {
						type: 'sensor1',
						common: {
							name: 'responseCode',
							type: 'number',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
					
					this.setState(path + 'responseCode', {val: response.status, ack: true});
				}
				).catch(
                    (error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code

                            this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js<div></div>
                            this.log.error(error.message);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            this.log.error(error.message);
                        }
                    }
                );
		}

		if (this.config.option3 == true){
			this.log.info('get Thermostat Data');			

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=thermostat&cmd=info',
				responseType: 'json'
			}).then(
				async (response) => {
					const content = response.data;

					this.log.info('local request done');
					this.log.info(JSON.stringify(content));
					this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					await this.setObjectNotExistsAsync(path + 'responseCode', {
						type: 'sensor1',
						common: {
							name: 'responseCode',
							type: 'number',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
					
					this.setState(path + 'responseCode', {val: response.status, ack: true});
				}
				).catch(
                    (error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code

                            this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js<div></div>
                            this.log.error(error.message);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            this.log.error(error.message);
                        }
                    }
                );			
		}

		if (this.config.option4 == true){
			this.log.info('get Solar Data');			

			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=solar&cmd=info',
				responseType: 'json'
			}).then(
				async (response) => {
					const content = response.data;

					this.log.info('local request done');
					this.log.info(JSON.stringify(content));
					this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));
					
					await this.setObjectNotExistsAsync(path + 'responseCode', {
						type: 'sensor1',
						common: {
							name: 'responseCode',
							type: 'number',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
					
					this.setState(path + 'responseCode', {val: response.status, ack: true});
				}
				).catch(
                    (error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code

                            this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js<div></div>
                            this.log.error(error.message);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            this.log.error(error.message);
                        }
                    }
                );
		}

		if (this.config.option5 == true)
		{
			this.log.info('get Dallas Sensor');
			
			axios({
				method: 'get',
				baseURL: 'http://' + configIPAdr + '/',
				url: '/api?device=dallassensor&cmd=info',
				responseType: 'json'
			}).then(
				async (response) => {
					const content = response.data;

					this.log.info('local request done');
					this.log.info(JSON.stringify(content));
					this.log.info('received data (' + response.status + '): ' + JSON.stringify(content));

					for (obj in content)
					{
						this.log.info(obj);
						//this.log.info(obj.id);
						//this.log.info(obj.temp);
					}
/*												
					await this.setObjectNotExistsAsync(obj, {
						type: 'Dallas Sensor',
						common: {
							name: obj,
							type: 'number',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
*/
//					this.setState(obj, {val: response.status, ack: true});

					for (obj2 in content.sensor1)
					{
						this.log.info(obj2);
						this.log.info(response.status);
						
						//this.log.info(obj2.id);
						//this.log.info(obj2.temp);
																	
					await this.setObjectNotExistsAsync(obj, {
						type: 'sate',
						common: {
							name: obj2,
							type: 'value',
							role: 'value',
							read: true,
							write: false
						},
						native: {}
					});
					
					this.subscribeStates(obj2);
					this.setState(obj2, {val: response.status, ack: true});
				}

									}
				).catch(
                    (error) => {
                        if (error.response) {
                            // The request was made and the server responded with a status code

                            this.log.warn('received error ' + error.response.status + ' response from local sensor ' + sensorIdentifier + ' with content: ' + JSON.stringify(error.response.data));
                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js<div></div>
                            this.log.error(error.message);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            this.log.error(error.message);
                        }
                    }
                );		
			}
/*			
			request(
				{
					//http://192.168.0.72/api?device=dallassensor&cmd=info
					url: "http://" + configIPAdr + "/api?device=dallassensor&cmd=info",
					json: true	
				}, 
				function(error, response, content) 
				{									
					//this.log.info(response.statusCode);
//					this.log.info('Request done');	
					//this.log.info(content);
				}
				);
				this.log.info(response.statusCode);
				this.log.info('Request done');
			}
					/*
					if (!error && response.statusCode == 200) {
						//this.log.info(response.statusCode);
						//this.log.info('Request done');	
						this.log.info(content);
					} else {
						//this.log.info(response.statusCode);
						//this.log.info('Request error');
						this.log.error(error);
					}
				}
				);
			*/				
		


		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/
		await this.setObjectNotExistsAsync('testVariable', {
			type: 'state',
			common: {
				name: 'testVariable',
				type: 'boolean',
				role: 'indicator',
				read: true,
				write: true,
			},
			native: {},
		});
		
		this.setState(obj, {val: response.status, ack: true});

		// In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.
		this.subscribeStates('testVariable');
		// You can also add a subscription for multiple states. The following line watches all states starting with "lights."
		// this.subscribeStates('lights.*');
		// Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
		// this.subscribeStates('*');

		/*
			setState examples
			you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
		*/
		// the variable testVariable is set to true as command (ack=false)
		await this.setStateAsync('testVariable', true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system
		await this.setStateAsync('testVariable', { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)
		await this.setStateAsync('testVariable', { val: true, ack: true, expire: 30 });

		// examples for the checkPassword/checkGroup functions
		let result = await this.checkPasswordAsync('admin', 'iobroker');
		this.log.info('check user admin pw iobroker: ' + result);

		result = await this.checkGroupAsync('admin', 'admin');
		this.log.info('check group user admin group admin: ' + result);
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (e) {
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }


	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.messagebox" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === 'object' && obj.message) {
	// 		if (obj.command === 'send') {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info('send command');

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
	// 		}
	// 	}
	// }
	
	}
}



if (require.main !== module) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new EmsEspGw(options);
} else {
	// otherwise start the instance directly
	new EmsEspGw();
}
	




/*
set setTimeout(function() {
	this.stop();
}, 10000)
*/
