import genToken from "../config/token.js"
import User from "../models/user.model.js"

const isProduction = process.env.NODE_ENV === "production";

const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Atomic upsert: prevents race condition / duplicate key errors on concurrent logins
        let user = await User.findOneAndUpdate(
            { email },
            { $setOnInsert: { name: name || "User", email, credits: 100 } },
            { upsert: true, returnDocument: 'after' }
        );

        let token = await genToken(user._id);

        res.cookie("token", token, getCookieOptions());

        return res.status(200).json(user);
    } catch (error) {
        console.error("Google Auth Controller Error:", error);
        return res.status(500).json({ message: `Google auth error: ${error.message || error}` });
    }
}

export const logOut = async (req, res) => {
    try {
        const { maxAge, ...clearOptions } = getCookieOptions();
        res.clearCookie("token", clearOptions);
        return res.status(200).json({ message: "LogOut Successfully" });
    } catch (error) {
        return res.status(500).json({ message: `Logout error: ${error.message || error}` });
    }
}