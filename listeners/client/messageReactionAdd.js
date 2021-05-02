import { Listener } from 'discord-akairo'
import config from '../../config'
import handleReaction from '../../utilities/handleReaction'

class MessageReactionAdd extends Listener {
  constructor () {
    super('messageReactionAdd', {
      emitter: 'client',
      event: 'messageReactionAdd'
    })
  }

  exec (reaction, user) {
    if (reaction.message.channel.id !== config.channels.reactionRoles.channel) {
      console.error("reaction add not in the valid channel, do nothing")
      return
    }

    handleReaction(reaction, user, true)
  }
}

export default MessageReactionAdd
