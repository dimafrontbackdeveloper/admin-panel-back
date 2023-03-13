import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as dayjs from 'dayjs'
import { fn, Op } from 'sequelize'
import { ViewsModel } from './views.model'

@Injectable()
export class ViewsService {
	constructor(
		@InjectModel(ViewsModel)
		private readonly viewsModel: typeof ViewsModel
	) {}

	async updateViews(movieId: number) {
		const row = await this.viewsModel.findOne({
			where: {
				// where - это параметр, который позволяет указать условия, которым должны соответствовать записи в базе данных, чтобы они были выбраны. Вы можете использовать различные операторы (например, Op.and, Op.or, Op.gt, Op.lt и т.д.), чтобы объединить несколько условий и создать более сложные запросы.
				movieId,
				[Op.and]: [
					// [Op.and] - это оператор Sequelize, который позволяет объединять несколько условий в объекте where
					fn('EXTRACT(MONTH from "createdAt") =', dayjs().get('month') + 1) // EXTRACT, чтобы извлечь месяц из поля createdAt в таблице базы данных. В данном случае мы проверяем, равен ли текуший месяц с тем, который мы извлекли
				]
			}
		})

		if (row) return row.increment('views')

		return this.viewsModel.create({
			movieId
		})
	}
}
