import { system, world } from '@minecraft/server'
import { setScore, getScore, delayedFunc } from "./../../util.js";

const command = {
    name: 'Blood Bending',
    description: 'Pick up entities and launch them into the distance! Only works on full moons.',
    style: 'water',
    sub_bending_required: 'blood',
    unlockable: 12,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    execute(player) {
        setScore(player, "cooldown", 0);

        const FULL_MOON = ((world.getAbsoluteTime() - world.getTime()) / 24000) % 8 == 0;
        const NIGHT_TIME = world.getTime() > 12000;
    
		if ((!FULL_MOON || !NIGHT_TIME) && getScore("level", player) < 100) return player.sendMessage("§cYou need the power of a full moon for this, or an incredibly high mastery - level 100 or more.");
		
        player.playAnimation("animation.water.blast");
        player.runCommand("inputpermission set @s movement disabled");
        
        delayedFunc(player, (fireSprint) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // Apply velocity in the direction the player is looking at
                player.runCommandAsync(`execute as @s positioned ^^1^5 run tp @e[r=4] ~~~`);
                player.runCommand("camerashake add @s 0.1 0.1 positional");

                // The end of the runtime
                if (currentTick > 35) {
                    player.runCommand("inputpermission set @s movement enabled");
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 6);
    }
}

export default command