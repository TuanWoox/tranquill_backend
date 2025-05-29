// TemplateMethod/UserHandlerTemplate.js
class BaseHandler {
  async handle(req, res) {
    try {
      const data = await this.execute(req, res);
      return res.status(200).json(data);
    } catch (err) {
      await this.undo(req, res);
      const status = err.status || 500;
      return res
        .status(status)
        .json({ message: err.message || "Internal Server Error" });
    }
  }

  async execute(req, res) {}
  async undo(req, res) {}
}

module.exports = BaseHandler;
