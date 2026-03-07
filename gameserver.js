function gameserver(port) {
	// FIX: Corrected folder names to lowercase to prevent Render/Linux crashes
	const utils1 = require("./modules/impmodules/util") 

	const util = new utils1()
	const vector = require('victor');

	const ipban = require("./banips.js")
	const devsip = require("./devip.js")

	const writer1 = require("./modules/impmodules/writer.js");
	const writer = new writer1();
	const fun1 = require("./entity/funs.js");
	const fun = new fun1();
	const game1 = require('./game')
	const game = new game1();

	const name1 = require("./modules/botnames")
	const name = new name1()

	const tierload1 = require("./playergameplay/choices/tierschoice")
	const tierload = new tierload1()

	const death = require("./handler/deathhandle")

	const reader = require("./modules/reader.js");

	const WebSocket = require('ws');

	const player = require("./entity/objects/objects/player.js");
	const hidinghole = require("./entity/objects/objects/waterspot");

	const bigabilities = require("./playergameplay/abilitiesuse/abilitiesusebigbutton");
	const miniabilities = require("./playergameplay/abilitiesuse/abilitiesuseminibutton");
	const sclick = require("./playergameplay/abilitiesuse/sclick");

	const map = require("./modules/map.js")

	const zoomentities = require("./playergameplay/zoomentities.js");

	const worldUpdate = require("./handler/worldupdate/normalworldupd");
	const devcommands = require("./modules/chat.js")
	const newobjids = require("./objids.js")


	const apexchoices = require('./playergameplay/choices/choices.js');
	const animalswitcher = require("./playergameplay/animalswitch.js");
	const tierswitcher = require("./playergameplay/tierswitch.js");

	const arena = require("./entity/objects/objects/arena")


	const fs = require('fs')
	const quadtree = require("./modules/quadtree");
	const createbot = require("./entity/bot.js");
	const Rectangle = require("./modules/rectangle")
	const border = new Rectangle(game.load(0) / 2, game.load(1) / 2, game.load(0), game.load(1))

	const QuadTree = new quadtree(null, border, 12, 12)


	var iper = ''
	let new1stimecount = Date.now()
	let updtime = Date.now()
	let boradupd = Date.now()

	const aobjids = new newobjids()

	// FIX: Changed port binding to 'noServer: true' for Render compatibility
	const wss = new WebSocket.Server({
		noServer: true
	});

	const TESTING = true
	const serverVer = 99;

	const MAXBOTS = game.load(4)
	var serverstarted = false
	setTimeout(() => {
		for (var i in self.entities) {
			entity_1 = self.entities[i]
			if (entity_1.type == 6) {
				entity_1.isdead = true
			}
			if (!entity_1.isdead) {
				for (var j in self.entities) {

					entity_2 = self.entities[j]
					if (!entity_2.isdead) {
						let distanceplay = util.getDistance2D(entity_1.x, entity_1.y, entity_2.x, entity_2.y)


						if (entity_1 && entity_2) {

							if (entity_2.id != entity_1.id) {
								if (entity_1.type == entity_2.type && entity_2.type == 7) {
									if (distanceplay <= entity_2.radius) {
										entity_2.isdead = true
									}
								}
								if (entity_1.type == 10 || entity_1.type == 7) {
									if (entity_2.type == 47 || entity_2.type == 10) {
										if (distanceplay <= entity_2.radius + entity_1.radius + 100) {
											entity_1.isdead = true
										}
									}
								}
								if (entity_1.type == 4 || entity_1.type == 27) {
									if (entity_2.type == 47 || entity_2.type == 10) {
										if (distanceplay <= entity_2.radius + entity_1.radius + 150) {
											entity_1.isdead = true
										}
									}
								}

								if (entity_1.type == 4) {

									if (entity_2.type == 4) {


										if (distanceplay <= entity_2.radius + entity_1.radius + 300) {
											entity_1.isdead = true
										}

									}
								}
								if (entity_1.type == 44 && entity_2.type == 44) {
									if (distanceplay <= (entity_1.radius + entity_2.radius) / 2) {
										entity_2.isdead = true
									}
								}
								if (entity_1.type == 27) {

									if (entity_2.type == 4) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 150) {

											entity_1.isdead = true
										}
									}

								}
								if (entity_1.type == 6) {
									if (entity_2.type == 4 || entity_2.type == 27 || entity_2.type == 10) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 50) {

											entity_1.isdead = true
										}
									}
								}
								if (entity_1.type == 27) {

									if (entity_2.type == 27) {
										if (distanceplay <= entity_1.radius + entity_2.radius + 300) {

											entity_2.isdead = true
										}
									}

								}
							}
						}
					}

				}
			}
		}
		serverstarted = true
	}, TESTING ? 1000 : 5000);

	var ips = []

	let playersNum = 0;

	this.entities = {};

	this.ws_new = {}

	let self = this
	new map(aobjids, self.entities)
	setTimeout(() => {


		for (let i = 0; i < MAXBOTS; i++) {
			var maanimals = tierload.tier14(false)
			new createbot(game.load(9), writer, aobjids, self.entities, maanimals, name.newnames(), 1500, false, util.randomNumber(0, 0), util.randomNumber(0, 0))
		}
	}, TESTING ? 1000 : 5000);
	try {
		wss.on('error', function (error) {
			console.log(error)
		})
		wss.on('connection', function connection(ws, req) { // FIX: Added 'req' for IP detection
			console.log("new player :" + (req.headers['x-forwarded-for'] || ws._socket.remoteAddress));
			var sum = 0
			for (let i in ips) {

				if (ips[i] == ws._socket.remoteAddress) {
					sum++
				}
				if (sum >= game.load(6)) {
					ws.close();
					break;
				}

			}

			ws.binaryType = 'arraybuffer';

			ws.exists = false
			ws.correctstring = util.randomString(20)
			ws.newstring = ""
			ws.send(writer.codecheck(ws.correctstring))
			ws.trys = 0
			let mnm = setInterval(() => {
				try {


					if (ws.trys >= 20) {

						clearInterval(mnm)
						ws.close();
						return
					}
					if (ws.correctstring + " " != ws.newstring) { ws.trys++; ws.send(writer.codecheck(ws.correctstring)); return };
					ws.isdeveloper = false
					new devsip(ws)

					if (!serverstarted || !ws.isdeveloper && playersNum >= game.load(3)) {
						if (playersNum > game.load(3)) {
							ws.send(writer.joinresponse(0))
						} else if (!serverstarted) {
							ws.send(writer.joinresponse(4))
						}
						setTimeout(() => {
							ws.terminate()
						}, 1000);

						return
					}

					ws.exists = true
					ws.correctstring = undefined
					ws.newstring = undefined
					ws.send(writer.joinresponse(1))

					new ipban(ws);

					if (!ws.isdeveloper) ips.push(ws._socket.remoteAddress)

					console.log("Player connected : ", ws._socket.remoteAddress);

					let randomentities = []


					for (var i in self.entities) {

						if (self.entities[i].type == 2) {
							randomentities.push(self.entities[i].id)
						}
					}
					var randomtest = Math.floor(Math.random() * randomentities.length);
					ws.spectatingon = randomentities[randomtest]
					ws.askedchoice = false

					ws.declareddisconnection = false

					ws.isalive = false
					ws.canSend = false;

					ws.timerafk = 0

					ws.id = Math.floor(Math.random() * 10000000000000) + 1;
					ws.nameLen = 1
					ws.name = ' '

					ws.xp = 500000

					ws.camx = util.randomNumber(0, game.load(0))
					ws.camy = util.randomNumber(0, game.load(1))
					ws.zoomheight = 500
					ws.zoomwidth = 700

					var river = ([])
					var volcano = ([])
					var lakes = ([])
					var mud = ([])
					var ice = ([])
					var hills = ([])
					var lakeislands = ([])
					var foodspot = ([])
					var waterspot = ([])
					for (let i in self.entities) {

						if (self.entities[i].type == 40) {
							river.push(self.entities[i])
						}
						if (self.entities[i].type == 47) {
							volcano.push(self.entities[i])
						}
						if (self.entities[i].type == 10) {
							lakes.push(self.entities[i])
						}
						if (self.entities[i].type == 7) {
							mud.push(self.entities[i])
						}
						if (self.entities[i].type == 17) {
							ice.push(self.entities[i])
						}
						if (self.entities[i].type == 3) {
							hills.push(self.entities[i])
						}
						if (self.entities[i].type == 11) {
							lakeislands.push(self.entities[i])
						}
						if (self.entities[i].type == 27 || self.entities[i].type == 28) {
							foodspot.push(self.entities[i])
						}
						if (self.entities[i].type == 4) {
							waterspot.push(self.entities[i])
						}
					}
					try {

						ws.send(writer.sendJoin(2000, ws.camx, ws.camy, river, volcano, lakes, mud, ice, hills, lakeislands, foodspot, waterspot)); //connection has been opened	
					} catch (error) {
						console.log(error)
						ws.terminate()
					}
					ws.tocreate = []
					ws.toupdate = []
					ws.todelete = []


					ws.animals = tierload.tier13(false)

					self.ws_new[ws.id] = ws
					var p = setInterval(() => {

						if (ws != undefined) {
							self.ws_new[ws.id] = ws
						} else {
							clearInterval(p)
						}
					}, 20);
					ws.trys = undefined
					clearInterval(mnm)
				} catch (error) {
					console.log(error)

					clearInterval(mnm)
				}
			}, 1000);


			ws.on('error', function (error) {
				ws.close();
			})


			ws.on('message', function incoming(message) {
				try {
					if (ws.player) {
						ws.timerafk = 0
					}
					let data = new DataView(message);
					//     console.log(new Buffer(message));
					let MsgReader = new reader(data);
					let msgType = MsgReader.readUInt8();


					switch (msgType) {

						case 2:
							if (!ws.exists) return;


							ws.send(writer.joinResponse());
							if (ws.askedchoice) return;

							//spawn + name
							//	 MsgReader.offsetPlus(2);
							var nameLen = MsgReader.readUInt16();



							var name = util.decode_utf8(MsgReader.readName((nameLen)));

							var length = 16;
							name = name.substring(0, length);


							let canvasW = MsgReader.readUInt16();
							let canvasH = MsgReader.readUInt16();

							let isSpectator = MsgReader.readUInt8();





							ws.nameLen = nameLen
							ws.name = name

							if (ws.name == " ") {
								ws.name = "mope.io "
							}

							console.log(ws.name + ":" + canvasW + ":" + canvasH + ", IP = " + ws._socket.remoteAddress);

							ws.askedchoice = true
							/*let id =
