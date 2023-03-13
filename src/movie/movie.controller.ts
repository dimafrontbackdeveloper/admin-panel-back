import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { MovieDto } from './movie.dto'
import { MovieService } from './movie.service'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm)
	}

	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.movieService.byId(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo() {
		return this.movieService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: MovieDto) {
		return this.movieService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.movieService.delete(+id)
	}
}
