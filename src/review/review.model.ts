import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { UserModel } from '../auth/user.model'
import { MovieModel } from '../movie/movie.model'

@Table({ tableName: 'Review', deletedAt: false, version: false })
export class ReviewModel extends Model<ReviewModel> {
	@Column({ defaultValue: '' })
	description: string

	@ForeignKey(() => UserModel) // нужен для того, чтобы сказать что это не просто поле userId, а что этот userId на что-то ссылаеться (в данном случае на UserModel)
	@Column
	userId: number

	@BelongsTo(() => UserModel)
	user: UserModel

	@ForeignKey(() => MovieModel)
	@Column
	movieId: number

	@BelongsTo(() => MovieModel)
	movie: MovieModel
}
