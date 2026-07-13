
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

async function seedAdmin() {
  const [, , name, email, password] = process.argv;

  if (!name || !email || !password) {
    console.error('Usage: npx tsx src/scripts/seedAdmin.ts "Admin Name" admin@example.com YourPassword');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI as string);

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('A user with this email already exists. Aborting.');
    await mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await User.create({ name, email, password: hashedPassword, role: 'admin' });

  console.log('Admin created:', admin.email, admin._id.toString());
  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});