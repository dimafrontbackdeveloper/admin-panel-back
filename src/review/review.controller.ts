import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ReviewDto } from './review.dto'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get()
	@Auth()
	async getAll() {
		return this.reviewService.getAll()
	}

	@Get(':id')
	@Auth()
	async getReview(@Param('id') id: string) {
		return this.reviewService.byId(+id)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteReview(@Param('id') id: string) {
		return this.reviewService.delete(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	@Auth()
	async createReview(@CurrentUser('id') id: string, @Body() dto: ReviewDto) {
		return this.reviewService.create(+id, dto)
	}
}
