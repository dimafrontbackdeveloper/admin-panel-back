import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ViewsController } from './views.controller'
import { ViewsModel } from './views.model'
import { ViewsService } from './views.service'

@Module({
	imports: [SequelizeModule.forFeature([ViewsModel])],
	controllers: [ViewsController],
	providers: [ViewsService]
})
export class ViewsModule {}
