import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserModel } from '../user.model'

export const CurrentUser = createParamDecorator(
	// Функция createParamDecorator является вспомогательной функцией NestJS, которая позволяет создавать собственные декораторы, которые можно использовать для получения параметров из запроса.
	(data: keyof UserModel, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
