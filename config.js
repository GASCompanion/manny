export default {
  commands: {
    defaultPrefix: '!'
  },
  automod: {
    newAccountAge: '30'
  },
  channels: {
    logs: {
      memberLog: process.env.MEMBER_LOG_CHANNEL
    },
    // custom
    reactionRoles: {
      channel: process.env.REACTION_ROLE_CHANNEL
    }
  },
  roles: {
    moderator: process.env.MODERATOR_ROLE
  },
  meta: {
    links: {
      github: 'https://github.com/GASCompanion',
      twitter: 'https://twitter.com/mklabs',
      website: 'https://gascompanion.github.io'
    }
  },

  // custom
  botId: process.env.BOT_ID,

  // Key value pairs of emoji name with associated role name
  emojis:{
    gsc: 'Companion',
    targeted: 'Targeter',
    twitch: 'Twitcher'
  },

  emojiInfos :{
    gsc: 'To receive notifications about GAS Companion',
    targeted: 'To receive notifications about Target System Plugin',
    twitch: 'To receive alerts for when I go live on twitch'
  }
}
