const db = require("../config/database");

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                console.error("Database Query Error:", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Test = {
    getAll: async () => {
        return query("SELECT * FROM test_table");
    },

    getById: async (id) => {
        const results = await query("SELECT * FROM test_table WHERE id = ?", [id]);
        return results.length ? results[0] : null;
    },

    insert: async (data) => {
        const results = await query("INSERT INTO test_table (name) VALUES (?)", [data.name]);
        return results.insertId;
    },

    update: async (id, data) => {
        const results = await query("UPDATE test_table SET name = ? WHERE id = ?", [data.name, id]);
        return results.affectedRows;
    },

    delete: async (id) => {
        const results = await query("DELETE FROM test_table WHERE id = ?", [id]);
        return results.affectedRows;
    },
};

module.exports = Test;