import { query } from "../config/db";

export interface Fund {
  id: number;
  name: string;
  amount: number;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

export const FundModel = {
  async getAll(): Promise<Fund[]> {
    const result = await query("SELECT * FROM funds ORDER BY created_at DESC");
    return result.rows;
  },

  async getById(id: number): Promise<Fund | null> {
    const result = await query("SELECT * FROM funds WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(data: {
    name: string;
    amount: number;
    description?: string;
  }): Promise<Fund> {
    const result = await query(
      "INSERT INTO funds (name, amount, description) VALUES ($1, $2, $3) RETURNING *",
      [data.name, data.amount, data.description || null],
    );
    return result.rows[0];
  },

  async update(
    id: number,
    data: { name?: string; amount?: number; description?: string },
  ): Promise<Fund | null> {
    const result = await query(
      `UPDATE funds
       SET name = COALESCE($1, name),
           amount = COALESCE($2, amount),
           description = COALESCE($3, description),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [data.name ?? null, data.amount ?? null, data.description ?? null, id],
    );
    return result.rows[0] || null;
  },

  async getSummary(): Promise<{ total_amount: number; fund_count: number }> {
    const result = await query(
      "SELECT COALESCE(SUM(amount), 0) AS total_amount, COUNT(*) AS fund_count FROM funds",
    );
    return {
      total_amount: parseFloat(result.rows[0].total_amount),
      fund_count: parseInt(result.rows[0].fund_count, 10),
    };
  },

  async delete(id: number): Promise<boolean> {
    const result = await query("DELETE FROM funds WHERE id = $1", [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
