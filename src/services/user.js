const { User, sequelize } = require("../models");

module.exports = {
  getAll: async () => {
    try {
      return await User.findAll();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  updateOne: async (balance, userId) => {
    try {
      const query = `UPDATE users SET balance = balance + ${balance} where id = ${userId}`;
      const res = await sequelize.query(query);
      if (!res[1].rowCount) throw new Error(`User with id ${userId} not found`);

      return { message: "Successfully updated the balance!" };
    } catch (error) {
      console.error("Error updating a balance:", error);
      if (error.parent?.code === "23514" && error.parent.constraint === "users_balance_ck") {
        error.message = "Balance can't be negative. Please check the amount for update.";
      }

      throw error;
    }
  },
};
