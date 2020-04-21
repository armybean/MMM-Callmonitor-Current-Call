# MMM-Callmonitor-Current-Call
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror) and can display currently active calls. It needs [MMM-FRITZ-Box-Callmonitor](https://github.com/armybean/MMM-FRITZ-Box-Callmonitor) or another module that can send <code>CALL_CONNECTED</code> and <code>CALL_DISCONNECTED</code> notifications.

I have forked the original repository by [`paviro`](https://github.com/paviro/MMM-Callmonitor-Current-Call) and extended it by adding arrows showing the direction of the call. Make sure to include my fork of [MMM-FRITZ-Box-Callmonitor](https://github.com/armybean/MMM-FRITZ-Box-Callmonitor) as this depends on it.

## Installation
Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/armybean/MMM-Callmonitor-Current-Call.git`.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Callmonitor-Current-Call',
		position: 'top_right',	// This can be any of the regions. Best results in left or right regions.
		header: "Active Calls", // This is optional
		config: {
			// optional config goes here
		}
	}
]
````

## Configuration options

The following properties can be configured:

| Option          | Possible Values | Description                                                                                                  |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| `showDirection` | `true` or `false` <br>**Default:** `false` | Display of an arrow in front of Caller name showing incoming or outgoing call     |
| `colorEnabled`  | `true` or `false` <br>**Default:** `false` | Show colored versions of the direction arrows (green = incoming, blue = outgoing) |


## Dependencies
- [MMM-FRITZ-Box-Callmonitor](https://github.com/armybean/MMM-FRITZ-Box-Callmonitor) (Fork by armybean of paviro's original module)

The MIT License (MIT)
=====================

Copyright © 2016 Paul-Vincent Roll

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
