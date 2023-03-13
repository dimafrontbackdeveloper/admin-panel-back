import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { MovieController } from './movie.controller'
import { MovieModel } from './movie.model'
import { MovieService } from './movie.service'

@Module({
	imports: [SequelizeModule.forFeature([MovieModel])],
	controllers: [MovieController],
	providers: [MovieService]
})
export class MovieModule {}
