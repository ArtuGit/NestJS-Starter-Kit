// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// import { envConfig } from '../../../config';

// @Injectable()
// export class WebSocketGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);

//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       await this.jwtService.verifyAsync(token, {
//         secret: envConfig.JWT_SECRET,
//       });
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: any): string | undefined {
//     const [type, token] =
//       request.handshake.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }
