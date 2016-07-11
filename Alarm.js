[{"id":"32b0b123.b7a61e","type":"mqtt-broker","broker":"localhost","port":"1883","clientid":""},{"id":"a0e8b9ec.5f1748","type":"mqtt in","name":"Storstugan rörelse alarm","topic":"1-wire/12/B1F76C000000/0","broker":"32b0b123.b7a61e","x":219,"y":479,"z":"2dff2cdb.d200d4","wires":[["f170c33b.0e8f4","ba3b5618.ca056","870f6d7e.341b6"]]},{"id":"a0571b19.5fa8e8","type":"pushover","title":"Stugan","name":"Anton","priority":0,"x":1031.25,"y":460,"z":"2dff2cdb.d200d4","wires":[]},{"id":"f170c33b.0e8f4","type":"function","name":"Silent alarm","func":"// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\nvar activation_time = 30*60*1000;\n\n \nvar Now = new Date();\n\n//Init time \ncontext.lasttriggerd = context.lasttriggerd || new Date(Now.getTime() - activation_time);\n\nvar timeDiff = Now - context.lasttriggerd;\n\ncontext.lasttriggerd = Now;\nconsole.log(timeDiff);\nif (timeDiff < activation_time)\n{\n    \n\treturn null;\n}\n\n\n\nif (typeof msg._name === 'string')\n{\n    msg.payload = msg._name + \" triggerd!\";\n}\nelse\n{\n    msg.payload = \"Motion sensor triggerd!\";\n}\n\nnode.warn(msg.payload);\n\nreturn msg;","outputs":1,"noerr":0,"x":687.75,"y":394.5,"z":"2dff2cdb.d200d4","wires":[["a0571b19.5fa8e8","708e9ed7.8f716","c3811b95.1c9f8"]]},{"id":"708e9ed7.8f716","type":"pushover","title":"Larm stugan","name":"Katrines telefon","priority":0,"x":1047.5,"y":539.75,"z":"2dff2cdb.d200d4","wires":[]},{"id":"4d3d7369.b2c28c","type":"inject","name":"","topic":"","payload":"Test medelande","payloadType":"string","repeat":"","crontab":"","once":false,"x":833,"y":565.25,"z":"2dff2cdb.d200d4","wires":[["708e9ed7.8f716"]]},{"id":"9c8bfa33.6dbfb8","type":"exec","command":"awk '{print $1*1000}' /proc/uptime","addpay":true,"append":"","useSpawn":"","name":"Uptime","x":234,"y":78,"z":"2dff2cdb.d200d4","wires":[["d0b9983a.e3ce48"],[],[]]},{"id":"fd21ebdd.4af708","type":"inject","name":"Restart","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"x":97,"y":76,"z":"2dff2cdb.d200d4","wires":[["9c8bfa33.6dbfb8"]]},{"id":"d0b9983a.e3ce48","type":"switch","name":"Test if rebooted recently","property":"payload","rules":[{"t":"lt","v":"300000"},{"t":"gte","v":"300000"}],"checkall":"true","outputs":2,"x":423,"y":63,"z":"2dff2cdb.d200d4","wires":[["1a8124fc.593393"],["e9ebc849.5c07e8"]]},{"id":"1a8124fc.593393","type":"change","name":"System rebooted","rules":[{"t":"set","p":"payload","to":"System rebooted"}],"action":"","property":"","from":"","to":"","reg":false,"x":648,"y":53,"z":"2dff2cdb.d200d4","wires":[["a0571b19.5fa8e8"]]},{"id":"e9ebc849.5c07e8","type":"change","name":"Nodered restarted","rules":[{"t":"set","p":"payload","to":"Nodered restarted"}],"action":"","property":"","from":"","to":"","reg":false,"x":630,"y":109,"z":"2dff2cdb.d200d4","wires":[["a0571b19.5fa8e8"]]},{"id":"c4cd8b88.8eb1","type":"inject","name":"Test","topic":"","payload":"init","payloadType":"string","repeat":"","crontab":"","once":false,"x":453.4999694824219,"y":415.25,"z":"2dff2cdb.d200d4","wires":[["f170c33b.0e8f4"]]},{"id":"c05fb3a4.5539a8","type":"mqtt in","name":"Magnet sensor locker","topic":"1-wire/12.8C0F6D000000/#","broker":"32b0b123.b7a61e","x":178.5,"y":797.9999389648438,"z":"2dff2cdb.d200d4","wires":[["6ea3acf3.a0a1ec"]]},{"id":"80d04d35.affda","type":"http request","name":"Alarm database","method":"POST","ret":"bin","url":"http://localhost:8086/write?db=alarm","x":994.75,"y":762.4999389648438,"z":"2dff2cdb.d200d4","wires":[[]]},{"id":"a8394199.b4f208","type":"function","name":"Format for db","func":"//temperatur_stugan_inne,type=temperature value=0.54\n\nvar datastring = msg.topic;\n\ndatastring = datastring + \" value=\" + msg.payload;\nmsg.payload = datastring;\n\nreturn msg;","outputs":1,"noerr":0,"x":820.0000610351562,"y":753.75,"z":"2dff2cdb.d200d4","wires":[["80d04d35.affda","870f6d7e.341b6"]]},{"id":"6ea3acf3.a0a1ec","type":"change","name":"Rename","rules":[{"t":"set","p":"topic","to":"Magnet_sensor_alarm_box"},{"t":"set","p":"_name","to":"Mangetic sensor"}],"action":"","property":"","from":"","to":"","reg":false,"x":450.25,"y":802.75,"z":"2dff2cdb.d200d4","wires":[["1479d56a.b098c3","9eaf977.c6abc68"]]},{"id":"ba3b5618.ca056","type":"change","name":"Rename","rules":[{"t":"set","p":"topic","to":"Storsstugan_motion"}],"action":"","property":"","from":"","to":"","reg":false,"x":506.5,"y":756.5,"z":"2dff2cdb.d200d4","wires":[["81a26918.25b64"]]},{"id":"1479d56a.b098c3","type":"function","name":"Silent alarm 2","func":"// The received message is stored in 'msg'\n// It will have at least a 'payload' property:\n//   console.log(msg.payload);\n// The 'context' object is available to store state\n// between invocations of the function\n//   context = {};\nvar activation_time = 30*60*1000;\n\n \nvar Now = new Date();\n\n//Init time \ncontext.lasttriggerd = context.lasttriggerd || new Date(Now.getTime() - activation_time);\n\nvar timeDiff = Now - context.lasttriggerd;\n\ncontext.lasttriggerd = Now;\n//console.log(timeDiff);\nif (timeDiff < activation_time)\n{\n    \n\treturn null;\n}\n\n\n\nif (typeof msg._name === 'string')\n{\n    msg.payload = msg._name + \" triggerd!\";\n}\nelse\n{\n    msg.payload = \"Motion sensor triggerd!\";\n}\n\nnode.warn(msg.payload);\n\nreturn msg;","outputs":1,"noerr":0,"x":672.5,"y":488.75,"z":"2dff2cdb.d200d4","wires":[["a0571b19.5fa8e8","c3811b95.1c9f8"]]},{"id":"e09057c.ca95128","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":163,"y":753.5,"z":"2dff2cdb.d200d4","wires":[["17497458.06e0ac"]]},{"id":"17497458.06e0ac","type":"trigger","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"2","extend":false,"units":"s","name":"","x":293.25,"y":756.75,"z":"2dff2cdb.d200d4","wires":[["ba3b5618.ca056"]]},{"id":"422c5e80.736ba8","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":666,"y":322,"z":"2dff2cdb.d200d4","wires":[["a0571b19.5fa8e8"]]},{"id":"870f6d7e.341b6","type":"debug","name":"","active":true,"console":"false","complete":"false","x":953,"y":615,"z":"2dff2cdb.d200d4","wires":[]},{"id":"81a26918.25b64","type":"function","name":"Convert Json","func":"var payload = JSON.parse(msg.payload);\n\nmsg.payload = payload.value;\n\nreturn msg;","outputs":1,"noerr":0,"x":658,"y":782,"z":"2dff2cdb.d200d4","wires":[["a8394199.b4f208"]]},{"id":"c3811b95.1c9f8","type":"change","name":"Rename","rules":[{"t":"set","p":"topic","to":"Pushover"}],"action":"","property":"","from":"","to":"","reg":false,"x":505,"y":720,"z":"2dff2cdb.d200d4","wires":[["a8394199.b4f208"]]},{"id":"9eaf977.c6abc68","type":"function","name":"Convert Json","func":"var payload = JSON.parse(msg.payload);\n\nmsg.payload = payload.value;\n\nreturn msg;","outputs":1,"noerr":0,"x":659,"y":822,"z":"2dff2cdb.d200d4","wires":[["a8394199.b4f208"]]}]
