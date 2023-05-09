const { generateError } = require("../helpers");

const deleteUser = async (req, res, next) => {
  try {
    let { verifyNickname } = req.body;

    if (!verifyNickname) {
      throw generateError("No has cubierto todos los campos", 400);
    }
    await deleteUser(req.user.id, verifyNickname);

    res.send({
      status: "ok",
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
