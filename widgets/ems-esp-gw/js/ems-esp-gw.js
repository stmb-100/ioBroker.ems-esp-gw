/*
	ioBroker.vis ems-esp-gw Widget-Set

	version: "0.0.1"

	Copyright 2021 Stefan github@stmb-mail.de
*/
'use strict';

// add translations for edit mode
$.extend(
	true,
	systemDictionary,
	{
		// Add your translations here, e.g.:
		// "size": {
		// 	"en": "Size",
		// 	"de": "Größe",
		// 	"ru": "Размер",
		// 	"pt": "Tamanho",
		// 	"nl": "Grootte",
		// 	"fr": "Taille",
		// 	"it": "Dimensione",
		// 	"es": "Talla",
		// 	"pl": "Rozmiar",
		// 	"zh-cn": "尺寸"
		// }
	}
);

// this code can be placed directly in ems-esp-gw.html
vis.binds['ems-esp-gw'] = {
	version: '0.0.1',
	showVersion: function () {
		if (vis.binds['ems-esp-gw'].version) {
			console.log('Version ems-esp-gw: ' + vis.binds['ems-esp-gw'].version);
			vis.binds['ems-esp-gw'].version = null;
		}
	},
	createWidget: function (widgetID, view, data, style) {
		var $div = $('#' + widgetID);
		// if nothing found => wait
		if (!$div.length) {
			return setTimeout(function () {
				vis.binds['ems-esp-gw'].createWidget(widgetID, view, data, style);
			}, 100);
		}

		var text = '';
		text += 'OID: ' + data.oid + '</div><br>';
		text += 'OID value: <span class="ems-esp-gw-value">' + vis.states[data.oid + '.val'] + '</span><br>';
		text += 'Color: <span style="color: ' + data.myColor + '">' + data.myColor + '</span><br>';
		text += 'extraAttr: ' + data.extraAttr + '<br>';
		text += 'Browser instance: ' + vis.instance + '<br>';
		text += 'htmlText: <textarea readonly style="width:100%">' + (data.htmlText || '') + '</textarea><br>';

		$('#' + widgetID).html(text);

		// subscribe on updates of value
		function onChange(e, newVal, oldVal) {
			$div.find('.template-value').html(newVal);
		}
		if (data.oid) {
			vis.states.bind(data.oid + '.val', onChange);
			//remember bound state that vis can release if didnt needed
			$div.data('bound', [data.oid + '.val']);
			//remember onchange handler to release bound states
			$div.data('bindHandler', onChange);
		}
	}
};

vis.binds['ems-esp-gw'].showVersion();