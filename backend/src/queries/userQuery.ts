import { db } from "../config/db";
import { users } from "../models/schema";
import { eq } from "drizzle-orm";

export const updateUserAvatar = async (userId: string, avatarUrl: string) => {
  const [updatedUser] = await db
    .update(users)
    .set({ avatar: avatarUrl })
    .where(eq(users.id, userId))
    .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        avatar: users.avatar
    });

  return updatedUser;
};
