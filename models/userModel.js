// models/userModel.js
const db = require('../config/database');
// User::create('John Doe', 'john@example.com', 'password123');
class User {
    static async create(name, email, password) {
        try {
            const [result] = await db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name, email, password]);
            return result.insertId;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    static async findAll() {
        try {
            const [rows] = await db.query('SELECT * FROM users');
            return rows;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    static async findById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }

    static async update(id, name, email) {
        try {
            await db.query('UPDATE users SET name = ?, email = ?  WHERE id = ?', [name, email, id]);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            await db.query('DELETE FROM users WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

module.exports = User;

// ဒီ code က User model ကို ဖန်တီးထားတာဖြစ်ပါတယ်။

// create() method
// အသုံးပြုသူအသစ်တစ်ယောက်ကို database ထဲသို့ ထည့်သွင်းပေးပါတယ်။
// name, email နဲ့ password တွေကို parameter အနေနဲ့ လက်ခံပြီး database ထဲကို ထည့်ပေးပါတယ်။
// အောင်မြင်ရင် ထည့်သွင်းလိုက်တဲ့ user ရဲ့ ID ကို ပြန်ပေးပါတယ်။

// findAll() method
// database ထဲက user အားလုံးကို ရှာဖွေပြီး ပြန်ပေးပါတယ်။

// findById(id) method
// ID တစ်ခုပေးလိုက်ရင် အဲ့ဒီ ID နဲ့ ကိုက်ညီတဲ့ user ကို ရှာဖွေပြီး ပြန်ပေးပါတယ်။

// update(id, name, email) method
// ID တစ်ခုပေးလိုက်ရင် အဲ့ဒီ ID နဲ့ ကိုက်ညီတဲ့ user ရဲ့ name နဲ့ email ကို update လုပ်ပေးပါတယ်။

// delete(id) method
// ID တစ်ခုပေးလိုက်ရင် အဲ့ဒီ ID နဲ့ ကိုက်ညီတဲ့ user ကို database ထဲကနေ ဖျက်ပစ်ပါတယ်။

// ဒီ method တွေအားလုံးမှာ try-catch block တွေသုံးထားပြီး error ဖြစ်ခဲ့ရင် console မှာ error message ပြပေးပါတယ်။

// နောက်ဆုံးမှာ User model ကို export လုပ်ထားပါတယ်။ ဒါကြောင့် တခြား file တွေကနေ ဒီ model ကို import လုပ်ပြီး သုံးလို့ရပါတယ်။