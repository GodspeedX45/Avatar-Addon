#bridge-file-version: #10
HIDE 
tag @s[tag=!human,tag=!avatar_state] add antimagic
tag @s[tag=!human,tag=!avatar_state] add chi_blocked
scoreboard players set @s[tag=!human,tag=!avatar_state] cooldown1 -100
execute @s[tag=avatar_state] ~~~ titleraw @p actionbar {"rawtext":[{"text":"§3You can't chi block the avatar state."}]}