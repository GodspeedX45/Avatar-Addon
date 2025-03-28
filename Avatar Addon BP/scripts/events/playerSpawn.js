import { getScore, setScore, getBendingStyle } from "./../util.js";
import { setup } from './../setup.js';

export function playerSpawn(eventData) {
    let { player, initialSpawn } = eventData;
    if (getScore("cooldown", player)) setScore(player, "cooldown", 0);

    // Setup for new players
    if (!player.hasTag("setup")) setup(player);

    // Make sure the settings are intialized and working properly
    let result = player.runCommand(`scoreboard players list avatar:config`).successCount;
    if (result) {
        player.runCommandAsync("scoreboard players operation @a settings = avatar:config settings");
    } else {
        player.runCommand("scoreboard players set avatar:config settings 13522211");
        player.runCommandAsync("scoreboard players operation @a settings = avatar:config settings");
    }

    // Make sure titles are shown or removed
    if (getBendingStyle(player) !== "Non-bender") {
        player.onScreenDisplay.setTitle(`a:${getBendingStyle(player).toLowerCase()}_super_fast`);
    } else {
        player.onScreenDisplay.setTitle(`a:reset`);
    }

    if (!initialSpawn) return;

    // Make sure airbenders in spirit form are killed if they log off during it.
    if (player.hasTag("spirit")) {
        player.sendMessage("§cYou logged out while in spirit. That is not allowed!");
        player.runCommandAsync("execute as @e[c=1,type=a:spirit_player] run event entity @s minecraft:despawn");
        player.removeTag("spirit");
        player.kill();
    }

    // Combat log
    if (getScore("combat", player) > 0) {
        player.sendMessage("§c§cYou logged out while in combat. That is not allowed!");
        player.kill();
    }

    // Just so relogging can stop stuns if they remain (bugs)
    player.runCommand("inputpermission set @s movement enabled");
}