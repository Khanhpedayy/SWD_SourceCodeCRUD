const db = require("../config/db");

const findAll = async ({ search = "", difficulty = "" }) => {
    let sql = `
        SELECT id, content, difficulty, question_type, topic, created_at, updated_at
        FROM questions
        WHERE 1 = 1
    `;
    const params = [];

    if (search) {
        sql += " AND content LIKE ?";
        params.push(`%${search}%`);
    }

    if (difficulty) {
        sql += " AND difficulty = ?";
        params.push(difficulty);
    }

    sql += " ORDER BY id DESC";

    const [rows] = await db.query(sql, params);
    return rows;
};

const findById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM questions WHERE id = ?",
        [id]
    );
    return rows[0];
};

const create = async (question) => {
    const [result] = await db.query(
        `INSERT INTO questions
        (content, difficulty, question_type, topic)
        VALUES (?, ?, ?, ?)`,
        [
            question.content,
            question.difficulty,
            question.question_type,
            question.topic
        ]
    );

    return findById(result.insertId);
};

const update = async (id, question) => {
    const [result] = await db.query(
        `UPDATE questions
         SET content = ?,
             difficulty = ?,
             question_type = ?,
             topic = ?
         WHERE id = ?`,
        [
            question.content,
            question.difficulty,
            question.question_type,
            question.topic,
            id
        ]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return findById(id);
};

const remove = async (id) => {
    const [result] = await db.query(
        "DELETE FROM questions WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};
