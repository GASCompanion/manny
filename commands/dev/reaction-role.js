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

  getReactions(reactions = [], reactionList = []) {
    // Key value pairs of emoji name with associated role name
    const { emojis, emojiInfos } = config

    const getEmoji = (emojiName) => this.client.emojis.cache.find((emoji) => emoji.name === emojiName)

    for (const key in emojis) {
      const emoji = getEmoji(key)
      reactions.push(emoji)

      const role = emojis[key]
      const text = emojiInfos[key] || `Give yourself the role: ${role}`
      reactionList.push(`${emoji} ${text}`)
    }
  }

  getEmbedMessage(reactionList) {
    reactionList.push(`...`)

    return this.client.util.embed()
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
  }

  async sendInitialMessage(message) {
    const reactions = []
    const reactionList = []
    this.getReactions(reactions, reactionList)
    
    const embed = this.getEmbedMessage(reactionList);

    const msg = await message.util.send({ embed })
    
    for (const reaction of reactions) {
      await msg.react(reaction)
    }
  }

  async exec (message) {
    if (message.channel.id !== config.channels.reactionRoles.channel) {
      const warn = `reaction-role command not in the valid channel`
      console.error(warn)
      return message.channel.send(`:exclamation: ${warn}`)
    }

    const channel = message.channel
    
    let reactionMsg
    try {
      console.log(`fetch previous message with id ${config.reactionRoleMessageId}`)
      reactionMsg = await channel.messages.fetch(config.reactionRoleMessageId);
    } catch (error) {
      console.error(`fetch failed for id ${config.reactionRoleMessageId}`)
    }

    if (!reactionMsg) {
      return await this.sendInitialMessage(message);
    }

    // We have a previous message, edit now

    const reactions = []
    const reactionList = []
    this.getReactions(reactions, reactionList)

    const embed = this.getEmbedMessage(reactionList);

    const messageReactions = reactionMsg.reactions.cache.map(reaction => {
      return reaction.emoji.name;
    });

    const expectedReactions = reactions.map(reaction => reaction.name)

    const difference = expectedReactions.filter(x => !messageReactions.includes(x));

    await reactionMsg.edit({ embed })
    for (const reactionName of difference) {

      const reaction = reactions.find(r => r.name == reactionName)
      if (!reaction) {
        continue;
      }

      console.log(`should react for ${reactionName} with`)
      console.log(reaction)
      await reactionMsg.react(reaction)
    }
  }
}

export default PingCommand
