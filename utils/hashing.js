import bcrypt from "bcryptjs";

export const doHash = async (value, saltValue)=>{
    const result = await bcrypt.hash(value, saltValue);
    return result;
};

export const compareHash = async(value, hashedValue)=>{
    const result = await bcrypt.compare(value, hashedValue);
    return result;
};