import { Request, Response } from 'express';
import { User,IUser } from '../models/User';
import { hashPassword, comparePassword } from '../helper/authHelper';
import jwt from 'jsonwebtoken';

interface RegisterRequestBody {
  username: string;
  name: string;
  email: string;
  password: string;
}

 interface ResponseDum {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    username: string;
  };
}

export const registerController = async (
  req: Request<{}, {}, RegisterRequestBody>, 
  res: Response
): Promise<Response<ResponseDum>> => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({success:false, message: "Please provide all the details" });
      
  }
    const existingUser  = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: existingUser.email === email
          ? "User with this email already exists"
          : "Username already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in register API",
    });
  }
};

interface LoginRequestBody {
  email : string,
  password : string
}
interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    username: string;
    name: string;
    email: string;
  };
  token?: string;
}

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response<LoginResponse>): Promise<Response<LoginResponse>> => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        username: user.username,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to login" });
  }
};
