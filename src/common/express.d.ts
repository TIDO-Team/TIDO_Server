import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string;
      tokenType?: string;
      isRoutePublic?: boolean;
    }
  }
}
