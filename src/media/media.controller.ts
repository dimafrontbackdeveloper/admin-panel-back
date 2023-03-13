import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from '../auth/decorators/auth.decorator'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Auth()
	@UseInterceptors(FileInterceptor('media')) //  это декоратор NestJS, который добавляет middleware-обработчик для загрузки файлов в приложение. FileInterceptor - это интерсептор (middleware), предоставляемый библиотекой @nestjs/platform-express, который обрабатывает загружаемый файл и сохраняет его в заданную директорию на сервере.
	async uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
