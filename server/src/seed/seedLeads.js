import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import { Lead } from '../models/Lead.js';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function run() {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('Connected for seeding');

    // Create one admin user
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
        const passwordHash = await bcrypt.hash('Admin@123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            passwordHash,
            role: 'admin'
        });
        console.log('Admin user created: admin@example.com / Admin@123');
    }

    await Lead.deleteMany({});
    console.log('Cleared existing leads');

    const statuses = ['New', 'Contacted', 'Qualified', 'Lost'];
    const owners = ['Aaditya', 'John Doe', 'Jane Smith', 'Sales Team'];

    const leads = [];

    for (let i = 0; i < 10000; i++) {
        leads.push({
            name: faker.person.fullName(),
            email: faker.internet.email().toLowerCase(),
            company: faker.company.name(),
            status: statuses[Math.floor(Math.random() * statuses.length)],
            owner: owners[Math.floor(Math.random() * owners.length)],
            createdAt: faker.date.past({ years: 1 })
        });
    }

    await Lead.insertMany(leads);
    console.log('Inserted 10,000 leads');

    await mongoose.disconnect();
    process.exit(0);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});