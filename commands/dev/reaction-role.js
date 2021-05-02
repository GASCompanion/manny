import { Command } from 'discord-akairo'
import config from '../../config'

class PingCommand extends Command {
  constructor () {
    super('reaction-role', {
      aliases: ['reaction-role', 'rr'],
      category: 'Developer',
      description: {
        name: 'Reaction Role',
        short: 'Create a Reaction Role Message.',
        syntax: '!reaction-role'
      },
      channel: 'guild',
      clientPermissions: ['SEND_MESSAGES'],
      userPermissions: ['BAN_MEMBERS']
    })
  }

  async exec (message) {
    if (message.channel.id !== config.channels.reactionRoles.channel) {
      const msg = `reaction-role command not in the valid channel`
      console.error(msg)
      return message.channel.send(`:exclamation: ${msg}`)
    }

    // Key value pairs of emoji name with associated role name
    const { emojis, emojiInfos } = config

    const getEmoji = (emojiName) => this.client.emojis.cache.find((emoji) => emoji.name === emojiName)

    const reactions = []
    const reactionList = []
    for (const key in emojis) {
      const emoji = getEmoji(key)
      reactions.push(emoji)

      const role = emojis[key]
      const text = emojiInfos[key] || `Give yourself the role: ${role}`
      reactionList.push(`${emoji} ${text}`)
    }

    reactionList.push(`...`)

    const embed = this.client.util.embed()
      .setTitle('Add a reaction to claim a role')
      .setDescription(`
In order to get notifications for only the stuff you care about, you can assign yourself your own roles.

These roles will allow you to avoid alerts for content you don't want.
      `)
      .addField(`Roles`, reactionList.join(`\n\n`))
      .addField(
        `\nYou can change your roles freely, by reacting or un-reacting at anytime.`,
        `If you have any problems with this or feel like some permissions are not working as they should, don't hesitate to contact me.`
      )
      .setFooter(`Kindly,\nMickael (mklabs)`)

    const msg = await message.util.send({ embed })
    
    for (const reaction of reactions) {
      await msg.react(reaction)
    }
  }
}

export default PingCommand
