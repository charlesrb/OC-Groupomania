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

const getComments = async (req, res, next) => {
  try {
    const commentaires = await prisma.comment.findMany({
      select: {
        id: true,
        content: true,
        createdAt: true,
        postId: true,
        author: {
          select: {
            id: true,
            surname: true,
            name: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(commentaires);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  const result = await prisma.comment.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Delete comment Id:", id);
  res.json(result);
};

module.exports = { getComments, createComment, deleteComment };
