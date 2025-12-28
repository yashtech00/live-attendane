import { Document, Types } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: Types.ObjectId;
        role: string;
        // Add other user properties as needed
      };
    }
  }
}
