/* global Module */

/* Magic Mirror
 * Module: MMM-Callmonitor-Current-Call
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

Module.register("MMM-Callmonitor-Current-Call", {

	// Default module config.
	defaults: {
		showDirection: false,
		colorEnabled: false
	},

	// Define required translations.
	getTranslations: function () {
		return {
			en: "translations/en.json",
			de: "translations/de.json"
		};
	},

	getScripts: function () {
		return ["moment.js"];
	},

	notificationReceived: function (notification, payload, sender) {
		if (notification === "CALL_CONNECTED") {
			if (payload.hasOwnProperty('direction')) {
				this.active_calls[payload.caller] = {start: moment(), direction: payload.direction};
			} else {
				this.active_calls[payload] = {start: moment(), direction: null};
			}
			if (!this.timer) {
				console.log("timer set");
				var self = this;
				this.timer = setInterval(function () {self.updateDom();}, 1000);
				this.updateDom(300);
			}
			console.log(this.active_calls);
		} else if (notification === "CALL_DISCONNECTED") {
			delete this.active_calls[payload];
			if (Object.keys(this.active_calls).length == 0) {
				clearInterval(this.timer);
				this.timer = false;
				console.log("timer cleared");
			}
			this.updateDom(300);
		}
	},

	start: function () {
		//Create active_calls array
		this.active_calls = {};
		//set timer
		this.timer = false;
		Log.info("Starting module: " + this.name);
	},

	getDom: function () {
		//Create table
		var wrapper = document.createElement("table");
		//set table style
		wrapper.className = "small";

		var calls = this.active_calls;
		console.log(this.active_calls);
		//If there are no calls, set "noCall" text.
		if (Object.keys(this.active_calls).length === 0 && this.data.header != null) {
			wrapper.innerHTML = this.translate("NoActiveCalls");
			wrapper.className = "xsmall dimmed";
			return wrapper;
		}

		//For each call in calls
		for (var call in calls) {
			if (!calls.hasOwnProperty(call)) continue;

			//Create callWrapper
			var callWrapper = document.createElement("tr");
			callWrapper.className = "normal";

			if (this.config.showDirection) {
				var iconWrapper = document.createElement("td");

				//Set icon
				var icon = document.createElement("i")
				icon.style = "padding-right: 10px"
				switch (calls[call].direction) {
					case "in":
						if (this.config.colorEnabled) {
							icon.style += ";color: #96FF96";
						}
						icon.className = "fas fa-level-down-alt";
						break;
					case "out":
						if (this.config.colorEnabled) {
							icon.style += ";color: #BCDDFF";
						}
						icon.className = "fas fa-level-up-alt"
						break;
				}
				iconWrapper.appendChild(icon)
				callWrapper.appendChild(iconWrapper);
			}

			//Set caller of row
			var caller = document.createElement("td");
			caller.innerHTML = call;
			caller.className = "title bright";
			callWrapper.appendChild(caller);

			//Set time of row
			var time = document.createElement("td");
			time.innerHTML = moment.utc(moment(moment()).diff(moment(calls[call]))).format("HH:mm:ss");
			time.className = "time light xsmall";
			callWrapper.appendChild(time);

			//Add to wrapper
			wrapper.appendChild(callWrapper);

		}
		return wrapper;
	}

});
