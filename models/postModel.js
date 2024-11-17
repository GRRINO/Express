const db = require('../config/database');
const { post } = require('../routes/userRoutes');

class Post{
    static async create(userId,title,content,photo){
        try{
            const [result] = await db.query(
                'INSERT INTO posts (user_id,title,content,photo) VALUES (?,?,?,?)',
                [userId,title,content,photo]
            );
            return result.insertId;

        }catch(error){
            console.error('Error creating post: ',error)
            throw error;
        }
    }

    static async findAll(){
        try{
            const[rows] = await db.query(
                'SELECT posts.* , users.name AS author FROM posts JOIN users ON posts.user_id = users.id'
            );
            return rows;
        }catch (error){
            console.error('Error fetching posts:',error);
            throw error;
        }
    }
    static async findById(id){
        try{
            const[rows]= await db.query(
                'SELECT posts.* , users.name AS author FROM posts JOIN users ON posts.user_id = user.id WHERE posts.id = ?',[id]
            );
            return rows[0]
        } catch(error){
            console.error('Error finding post by ID: ',error)
            throw error;
        }
    }
    static async update(id,title,content,photo){
        try{
            if(photo){
                await db.query(
                    'UPDATE posts SET title = ? , content = ?,photo = ? WHERE id = ?',
                    [title,content,photo,id]
                )
            } else {
                await db.query(
                    'UPDATE posts SET title = ?,content = ? WHERE id = ?',
                    [title,content,id]
                )
            }
        } catch(error){
            console.error('Error finding post by ID: ',error)
            throw error;
        }
    }

    static async delete(id){
        try{
            await db.query('DELETE FROM posts WHERE id = ?',[id])
        }catch(error){
            console.error('Error finding post by ID: ',error)
            throw error;
        }
    }

}

module.exports = Post;