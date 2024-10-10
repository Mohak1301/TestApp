import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string | undefined> => {
  try {
    const saltround = 10;
    const hashedPassword = await bcrypt.hash(password, saltround);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return undefined; 
  }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false;
    }
  };