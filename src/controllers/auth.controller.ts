import { Request, Response } from "express";

// Schema Login
type TLogin = {
    identifier: string;
    password: string;
}

export default {
    async login(req: Request, res: Response) {
        const { identifier, password } = req.body as unknown as TLogin

        try {
            res.status(200).json({
                message: "Login Berhasil",
                data: { identifier, password }
            });
        } catch (error) {
            const err = error as unknown as Error
            res.status(400).json({
                message: err.message,
                data: null
            });
        }
    },
};