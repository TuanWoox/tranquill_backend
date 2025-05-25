// TemplateMethod/UserHandlerTemplate.js
class BaseHandler {
  async handle(req, res) {
    try {
      const data = await this.execute(req, res);
      return res.status(200).json(data);
    } catch (err) {
      const status = err.status || 500;
      return res
        .status(status)
        .json({ message: err.message || "Internal Server Error" });
    }
  }

  async execute(req, res) {
    throw new Error("execute() must be implemented");
  }
}

module.exports = BaseHandler;
