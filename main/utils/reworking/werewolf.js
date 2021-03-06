const {asyncWait} = require("./COMMON.js");

const handleGameOutput = async (api, mssg, game, err, stdout) => {
	if (err) {
		console.log(err);
		// api.sendMessage("Đã gặp lỗi trong lúc start game :(", mssg.threadID);
		return;
	}
	const output = JSON.parse(stdout.toString().trim());
	for (const data of output.messages) {
		if (!data.to) api.sendMessage(data.message, mssg.threadID);
		else {
			api.sendMessage(
				data.message,
				game.playerManager.find({
					id: data.to
				}).id
			);
		}
		await asyncWait(3000);
	}
};

module.exports = {handleGameOutput};
