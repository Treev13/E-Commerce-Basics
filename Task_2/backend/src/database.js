import pool from "./config/mysql.config.js";

export async function getProducts() {
    const [rows] = await pool.query(`
    SELECT * FROM products
    WHERE active = 1;
    `);
    return rows;
};

export async function getProduct(id) {
    const [rows] = await pool.query(`
    SELECT *
    FROM products
    WHERE id = ?
    `, [id]);
    return rows[0];
};

export async function createProduct(name, price, image, active) {
    const [result] = await pool.query(`
    INSERT INTO products (product_name, price, image_url, active)
    VALUES (?, ?, ?, ?)
    `, [name, price, image, active]);
    const id = result.insertId;
    return getProduct(id);
};
