const { requestSchema } = require("../validators/requestValidator");
const userService = require("../services/user");

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await userService.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },

  updateBalance: async (req, res, next) => {
    try {
      const { error } = requestSchema.validate(req);
      if (error) throw error;

      const { params: { id }, body: { balance } } = req;
      const updateRes = await userService.updateOne(balance, id);

      res.status(201).json(updateRes);
    } catch (error) {
      next(error);
    }
  }
}
