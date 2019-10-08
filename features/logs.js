
module.exports = function(controller) {

    controller.hears('logs','message,direct_message', async (bot, message) => {

        var child_process = require("child_process");
        var child = child_process.spawnSync('kubectl', ['logs', 'coredns-5644d7b6d9-8bhw7', '--tail=5', '-n', 'kube-system'], { encoding : 'utf8' });
        console.log("Process finished.");
        if(child.error) {
            console.log("ERROR: ",child.error);
        }
        console.log("stdout: ",child.stdout);
        console.log("stderr: ",child.stderr);
        console.log("exist code: ",child.status);
    
        await bot.reply(message, "``` Begin Logs: \n"+child.stdout+" ```")
        })
}