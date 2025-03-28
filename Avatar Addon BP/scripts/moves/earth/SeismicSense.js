import { delayedFunc, setScore, calculateDistance, getScore } from "../../util.js";

const command = {
    name: 'Seismic Sense',
    description: 'Displays the basic stats of all players in a 150 block radius along with their location, and if they are sneaking or not.',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    uti_tier_required: 10,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.earth.shockwave");

        // To be executed when the animation is done
        delayedFunc(player, (airBlast) => {
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 150, excludeNames: [player.name], type: "player", excludeTags: ["bending_dmg_off"] })];
        
            if (!entities.length) return player.sendMessage(`§7No players could be found.`);

            // Loop through all nearby players
            entities.forEach(entity => {
                const loc = entity.location;
                player.sendMessage(`§7${entity.name} is ${calculateDistance(player.location, loc).toFixed(0)} blocks away, at ${loc.x.toFixed(0)} ${loc.y.toFixed(0)} ${loc.z.toFixed(0)}. They are ${getScore("detect_sneak", entity) ? "" : "not "}sneaking.`);
            });
        }, 15);
    }
}

export default command