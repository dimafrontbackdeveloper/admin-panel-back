import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { getSequelizeConfig } from './config/db.config'
import { MediaModule } from './media/media.module'
import { MovieModule } from './movie/movie.module'
import { ReviewModule } from './review/review.module'
import { StatisticsModule } from './statistics/statistics.module'
import { ViewsModule } from './views/views.module'

@Module({
	imports: [
		ConfigModule.forRoot(), // чтобы нест считывал всю конфигурацию (.env)
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig
		}), // когда мы хотим в наш модуль импортировать другие модули, мы используем imports

		AuthModule,
		MovieModule,
		ReviewModule,
		ViewsModule,
		MediaModule,
		StatisticsModule
	],
	controllers: [AppController],
	providers: [AppService] // в провайдерах может быть любой переиспользоваемый компонент приложения (сервисы, паттерны, стратегии и тд). В общем это то, что может переиспользоваться в других компонентах
}) // Декоратор - обертка, которые дают дополнительный функционал для класа либо функции
export class AppModule {}
