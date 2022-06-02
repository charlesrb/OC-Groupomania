const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createComment = async (req, res, next) => {
  try {
    const { content, postId, authorId } = req.body;

    const commentaire = await prisma.comment.create({
      data: {
        content,
        authorId,
        postId,
      },
    });
    res.status(200).json({
      status: true,
      message: "Comment created !",
      data: commentaire,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// NE FONCTIONNE PAS
const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const commentaires = await prisma.comment.findMany({
      where: {
        postId: Number(postId),
      },

      select: {
        id: true,
        content: true,
        createdAt: true,
        postId: true,
        authorId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      status: true,
      message: "Commentaires récupérés !",
      data: commentaires,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getComments, createComment };
