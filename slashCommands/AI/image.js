const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "image", //the command name for the Slash Command
  description: "Send a Text into the Chat", //the command description for Slash Command Overview
  cooldown: 5,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
		{"String": { name: "text", description: "What should I imagine? [ +n+ = Newline ]", required: true }},

  ],
  run: async (client, interaction) => {
    try{
	    //console.log(interaction, StringOption)
		
		//things u can directly access in an interaction!
		const { member, channelId, guildId, applicationId, 
		        commandName, deferred, replied, ephemeral, 
				options, id, createdTimestamp 
		} = interaction; 
		const { guild } = member;
		const Text = options.getString("text");
	const apiKey = "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";
	const client = axios.create({
	    headers: { 'Authorization': 'Bearer ' + apiKey }
	});
	
	const params = {
	    "prompt": Text,
	    "n": 1,
	    "size": "1024x1024"
	}
 	interaction.reply({content: `Loading...`, ephemeral: true}); 
	client.post('https://api.openai.com/v1/images/generations', params)
	  .then(result => {
	 interaction.channel.send({
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Generated Image`,
      "description": "Prompt: " + Text +"\nRequested by: " + "<@" + interaction .member + ">",
      "color": 0x00FFFF,
      "image": {
        "url": result.data.data[0].url,
        "height": 600,
        "width": 600
      }
    }
  ]
});
	}).catch(err => {
	 interaction.reply({content: `error` + err, ephemeral: true}); 
	});
    } catch (e) {
        console.log(String(e.stack).bgRed)
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
