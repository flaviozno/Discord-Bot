const{
    Client,
    Attachment
} = require('discord.js');

const ytdl = require("ytdl-core");
const bot = new Client();
const token = 'ODEwMTQwMjYzMjEyNjQ2NDkw.YCfT6g.Hp6J4rv3ij6F_UhRi0X3FBV54ak';
const PREFIX = '=';
var version = '1.5';
var servers = {};

/* Talvez eu use para trolar um mano, mas só dpois
var bdayclock = new Date();

var hours = bdayclock.getHours();
var min = bdayclock.getMinutes();
var sec = bdayclock.getSeconds();


var AmPm = (hours<12)? "AM" : "PM";

hours = (hours>12)? hours - 12 : hours;

hours = ("0"+hours).slice(-2);
min = ("0"+min).slice(-2);
sec = ("0"+sec).slice(-2);
*/

bot.login(token);

bot.on('ready', () => {
    console.log('Estou pronto para ser usado na versão ' + version);
})

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'play':
        
        function play(connection, message) {
            var server = servers[message.guild.id];

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "",quality: "highest"}));

            server.queue.shift();

            server.dispatcher.on('finish', function(){
                if(server.queue[0]){
                    play(connection, message);
                }else{
                    message.channel.send("A música acabou!");
                    connection.disconnect();
                }
            });
        }


            if(!args[1]){
                message.channel.send("Você precisa colocar o link do vídeo!");
                return;
            }
            
            if(!message.member.voice.channel){
                message.channel.send("Você precisa estar no canal de voz!");
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }
            
            var server = servers[message.guild.id];

            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
                play(connection, message);
            })
        
        break;

        case 'stats':
            message.channel.send("Estou pronto para servir!");
            return;
        break;
        
        case 'ping':
            const timeTaken = Date.now() - message.createdTimestamp;
            if(timeTaken <= 0)
                message.reply(`Pong! Tu é o host?`);
            else
                message.reply(`Pong! Latência de ${timeTaken}ms.`);
        break;

        case 'version':
            message.channel.send("Estou rodando a versao " + version);
            return;
        break;
    };
});
