import config from "../config"

const { emojis, botId } = config

const handleReaction = (reaction, user, isAdd) => {
    if (user.id === botId) {
        return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
        console.error("Invalid roleName")
        return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (isAdd) {
        return member.roles.add(role)
    } else {
        return member.roles.remove(role)
    }
};

export default handleReaction