import { Listener } from 'discord-akairo'
import { DateTime } from 'luxon'
import config from '../../config'
import handleReaction from '../../utilities/handleReaction'

class MessageReactionRemove extends Listener {
  constructor () {
    super('messageReactionRemove', {
      emitter: 'client',
      event: 'messageReactionRemove'
    })
  }

  exec (reaction, user) {
    if (reaction.message.channel.id !== config.channels.reactionRoles.channel) {
      console.error("reaction remove not in the valid channel, do nothing")
      return
    }

    handleReaction(reaction, user, false)
  }
}

export default MessageReactionRemove
