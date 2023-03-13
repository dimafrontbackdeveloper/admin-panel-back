import { faker } from '@faker-js/faker'
import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { compare, genSalt, hash } from 'bcryptjs'
import { AuthDto } from './dto/auth.dto'
import { UserModel } from './user.model'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private readonly userModel: typeof UserModel,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		console.log(user.role)

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userModel.findOne({
			where: { email: dto.email }
		})
		if (oldUser)
			throw new BadRequestException(
				'User with this email is already in the system'
			)

		const salt = await genSalt(10)

		const user = await this.userModel.create({
			email: dto.email,
			password: await hash(dto.password, salt),
			name: faker.name.firstName(),
			avatarPath: faker.image.avatar()
		})

		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userModel.findOne({
			where: { email: dto.email },
			attributes: ['id', 'email', 'password', 'avatarPath', 'name', 'role']
		})
		if (!user) throw new UnauthorizedException('User not found')

		let isValidPassword = null

		// admin password didn't hash
		if (dto.email === 'admin@gmail.com') {
			isValidPassword = dto.password === user.password
		} else {
			isValidPassword = await compare(dto.password, user.password)
		}

		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}

	async issueAccessToken(userId: string) {
		const data = { id: userId }

		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		}) // других опций больше передавать не нада, так как мы их уже указали в регистарации модуля
	}

	returnUserFields(user: UserModel) {
		return {
			id: user.id,
			email: user.email,
			avatarPath: user.avatarPath,
			name: user.name,
			role: user.role
		}
	}
}
