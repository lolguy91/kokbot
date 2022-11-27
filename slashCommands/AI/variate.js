const { MessageEmbed } = require("discord.js");
const axios = require("axios");
const config = require("../../botconfig/config.json");
const fetch = require("node-fetch");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "variate", //the command name for the Slash Command
  description: "Generate an AI image!", //the command description for Slash Command Overview
  cooldown: 5,
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  options: [ //OPTIONAL OPTIONS, make the array empty / dont add this option if you don't need options!
		{"String": { name: "text", description: "plz add a URL for an image to variate? [ +n+ = Newline ]", required: true }},

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
		const Url = options.getString("text");
	const apiKey = config.OpenAIkey;
	const client = axios.create({
	    headers: { 'Authorization': 'Bearer ' + apiKey }
	});

var buffer = null;
await fetch(Url).then(R=>{
 buffer =  R.buffer()
})

buffer.name = "image.png";
console.log(buffer);

	const params = {
	    "image": buffer,
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
        "url": "https://webshot.nodesite.eu/rest/1024/1024/full/" + result.data.data[0].url,
        "height": 600,
        "width": 600
      }
    }
  ]
});
	}).catch(err => {
    interaction.channel.send({content: `error` + err, ephemeral: true}); 
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
