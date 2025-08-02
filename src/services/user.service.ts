import prisma from "@prisma";
import { UpdateProfileInput } from "@validations";

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
};

export const updateUserProfile = async (id: string, data: UpdateProfileInput) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};
