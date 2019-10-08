
module.exports = function(controller) {

    controller.hears('pods','message,direct_message', async (bot, message) => {

        var child_process = require("child_process");
        var child = child_process.spawnSync('kubectl', ['get', 'pods', '--all-namespaces'], { encoding : 'utf8' });
        console.log("Process finished.");
        if(child.error) {
            console.log("ERROR: ",child.error);
        }
        console.log("stdout: ",child.stdout);
        console.log("stderr: ",child.stderr);
        console.log("exist code: ",child.status);
    
        await bot.reply(message, "``` "+child.stdout+" ```")
        })
}