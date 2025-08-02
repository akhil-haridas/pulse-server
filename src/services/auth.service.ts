import bcrypt from "bcryptjs";
import prisma from "@prisma"
import { RegisterInput, LoginInput } from "@validations";

export const registerUser = async (data: RegisterInput) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
    });
    return user;
};

export const loginUser = async (data: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Invalid credentials");

    return user;
};
