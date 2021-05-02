import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import { Signale } from 'signale'

const ssl = process.env.DATABASE_SSL == "true" ? true : false

const dialectOptions = {}
if (ssl) {
  dialectOptions.ssl = {
    required: true,
    rejectUnauthorized: false
  }
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  dialectOptions
})

const log = new Signale()

class Database {
  static get sequelize () {
    return sequelize
  }

  static async authenticate () {
    try {
      await sequelize.authenticate()
      log.success('Database connection successful')
      await this.loadModels(path.join(__dirname, '..', 'models'))
    } catch (err) {
      log.error('Database connection failed')
      log.error(err)
    }
  }

  static async loadModels (models) {
    try {
      const files = await fs.promises.readdir(models)

      for (const file of files) {
        await require(path.join(models, file))
      }

      await sequelize.sync()
      log.info('Models synchronized')
    } catch (err) {
      log.error(err)
    }
  }
}

export default Database
