import User from "~/class/user.class";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import JWT from "~/class/jwt.class";

export const AuthController = {

    async login(req: any, res: any) {
        const { email, password } = req.body;
        if (email && password) {
            let user = new User();
            let userModel = await user.findByEmail(email);
            if (!userModel) {
                res.status(404).json({ msg: 'No such user found with this email' });
                return;
            }
            if ( await bcrypt.compare(password, userModel?.get('password') as string)) {
                let token = jwt.sign({
                    id: userModel.get("id") as string,
                    name: userModel.get("name") as string,
                    email: userModel.get("email") as string
                }, JWT.jwtOptions.secretOrKey, {
                    expiresIn: "6h"
                });
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: false
                });
                res.send();
            } else {
                res.status(400).json({ code: 0x4 });
            }
        } else if (!password && email) {
            res.status(400).json({ code: 0x2 });
        } else if (!email && password) {
            res.status(400).json({ code: 0x1 });
        } else {
            res.status(400).json({ code: 0x3 });
        }
    },

    async register(req: any, res: any) {
        const { name, password, email } = req.body;
        if (!name && !password && !email) {
            res.status(400).json({ code: 0x6 });
            return;
        } else if (!name) {
            res.status(400).json({ code: 0x4 });
            return;
        } else if (!password) {
            res.status(400).json({ code: 0x3 });
            return;
        } else if (!email) {
            res.status(400).json({ code: 0x2 });
            return;
        }
        let user = new User();
        if ((await user.isMailRegistered(email)) === true) {
            res.status(403).json({ code: 0x2 });
            return;
        }
        user.fromPurData(name, password, email);
        let userModel = await user.create();
        res.send({ msg: "Created successfully" });
    },

    async getAuthedUser(req: any, res: any) {
        let user = new User();
        if (req.user) {
            const result = await user.find(req.user.id)
            res.send(result);
        } else
            res.sendStatus(401);
    },

    async logout(req: any, res: any) {
        res.clearCookie("token");
        res.send();
    }

}