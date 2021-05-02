import { Listener } from 'discord-akairo'

class ReadyListener extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    })
  }

  exec () {
    this.client.guilds.cache.each(guild => this.client.log.success(`${this.client.user.username} successfully connected to ${guild.name}`))
    this.client.user.setActivity('the server • !help', { type: 'WATCHING' })
  }
}

export default ReadyListener
