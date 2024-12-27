import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { loginUserDB } from "../model/reg_usersDB.js";

config()

const checkUser = async (req, res, next) => {
    const { email, password } = req.body;
    let user = await loginUserDB(email)
    let hashedP = user.user_pwd

    if (!password || !hashedP) {
        res.status(400).json({ message: "Password of hashed password is missing" })
        return
    }

    let result = await compare(password, hashedP)
    try {
        if (result == true) {
            const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: "1h" });

            res.cookie('token', token, { httpOnly: true })

            req.body.token = token
            next()
            return
        } else {
            res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        res.json({ message: "Invalid email or password" })
    }
}

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token
    
//     if (!token) {
//         res.status(401).json({ message: "Unauthorized" })
//         return
//     }
//     try {
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 res.json({ message: "Token has expired" })
//                 return
//             }
//             req.body.token = decoded
//             next()
//         })
//     } catch (error) {
//         res.json({ message: "You are not logged in" })
//     }
// }

export { checkUser }