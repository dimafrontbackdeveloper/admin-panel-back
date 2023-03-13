import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => {
	return {
		dialect: 'postgres',
		host: 'localhost',
		port: configService.get('PORT'),
		database: configService.get('DATABASE'),
		username: configService.get('DB_USERNAME'),
		password: configService.get('PASSWORD'),
		autoLoadModels: true, // автоматическое создание таблиц в бд на основе моделей
		synchronize: true,
		logging: false
	}
}
