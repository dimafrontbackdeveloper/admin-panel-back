import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op, WhereOptions } from 'sequelize'
import { UserModel } from '../auth/user.model'
import { ReviewModel } from '../review/review.model'
import { MovieDto } from './movie.dto'
import { MovieModel } from './movie.model'

@Injectable()
export class MovieService {
	constructor(
		@InjectModel(MovieModel)
		private readonly movieModel: typeof MovieModel
	) {}

	async byId(id: number) {
		const movie = await this.movieModel.findOne({
			// findOne - для поиска одной записи в базе данных, которая соответствует id
			where: { id },
			include: [
				{
					model: ReviewModel, // вернуть сзязанную ReviewModel
					include: [UserModel] // вернуть UserModel сзязанную к ReviewModel
				}
			]
		})
		if (!movie) throw new NotFoundException('Video not found')

		return movie
	}

	paginate = (query, { page, pageSize }) => {
		const offset = page * pageSize
		const limit = pageSize

		return {
			...query,
			offset,
			limit
		}
	}

	async getAll(searchTerm?: string) {
		console.log('get all')

		let options: WhereOptions<MovieModel> = {}

		if (searchTerm)
			options = {
				name: { [Op.like]: `%${searchTerm}%` } // Оператор Op.like используется для выполнения поиска по части строки в столбце базы данных. Мы можем использовать символы % для указания места, где может быть любой набор символов.
			}

		return this.movieModel.findAll({
			where: {
				...options
			},
			order: [['createdAt', 'DESC']], // для сортировки найденных записей по дате создания (createdAt) в порядке убывания (DESC), то есть сначала новые записи.
			include: [
				{
					all: true // all: true для включения всех связанных данных.
				}
			]
		})
	}

	async create() {
		const movie = await this.movieModel.create()
		return movie.id
	}

	async update(id: number, dto: MovieDto) {
		const movie = await this.byId(id)

		return movie.update({
			...movie,
			...dto
		})
	}

	async delete(id: number) {
		return this.movieModel.destroy({ where: { id } })
	}
}
