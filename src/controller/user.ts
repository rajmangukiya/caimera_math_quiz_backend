import { Request, Response } from "express";
import userQuery from "../db/query/user";

const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.cookies?.id;

    let user = await userQuery.getUserById(id) || await userQuery.createUser();

    res.cookie("id", user.id, { 
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'none'
     });

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.clearCookie("id");
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

export default { getUser };