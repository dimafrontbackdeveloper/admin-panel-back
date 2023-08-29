import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { getJWTConfig } from '../config/jwt.config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/auth.strategy'
import { UserModel } from './user.model'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		}), // чтобы использовать JwtService в auth.service.ts. Итак, в auth.module.ts вы импортируете и используете JwtModule, потому что это модуль, отвечающий за аутентификацию и авторизацию. А в app.module.ts он не нужен, потому что он не является частью основной функциональности вашего приложения, а является частью более узкой, специфической области функциональности.
		SequelizeModule.forFeature([UserModel])
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
