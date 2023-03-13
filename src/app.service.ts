import { Injectable } from '@nestjs/common'

@Injectable() // чтобы этот клас стал провайдером, необходимо пометить его декоратором Injectable. Так как в дальнейшем этот сервис мы будем внедрять в контроллер
export class AppService {
	getHello(): string {
		return 'Hello World!'
	}
}
