import { Command } from 'discord-akairo'
import { isAfter , formatDuration, intervalToDuration  } from 'date-fns'

class EldenRingCommand extends Command {
  constructor () {
    super('elden-ring', {
      aliases: ['er', 'elden', 'eldenring', 'elden-ring'],
      category: 'Fun',
      description: {
        name: 'Elden Ring',
        short: 'Check how long we still have to wait for Elden Ring release.',
        syntax: '!elden'
      },
      channel: 'guild',
      clientPermissions: ['SEND_MESSAGES']
    })
  }

  async exec (message) {
    const releaseDate = new Date(2022, 1, 25, 0, 0, 0, 0);
    const countdown = formatDuration(intervalToDuration( { start: new Date(), end: releaseDate } ));

    if (isAfter(new Date(), releaseDate)) {
      return message.util.send(`Elden Ring is released already... What are you waiting for ?`);
    }

    return message.util.send(`Elden Ring is set to release in **${countdown}**. Get ready...`);
  }
}

export default EldenRingCommand