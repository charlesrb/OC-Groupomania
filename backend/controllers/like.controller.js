const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addLike = async (req, res, next) => {
  try {
    const { postId, authorId } = req.body;
    const isLike = await prisma.like.findMany({
      where: {
        author: {
          id: Number(authorId),
        },
        post: {
          id: Number(postId),
        },
      },
    });
    if (isLike.length > 0) {
      console.log("Déjà liké !");
      const likeId = JSON.parse(JSON.stringify(isLike));
      const deleteLike = await prisma.like.delete({
        where: {
          id: likeId[0].id,
        },
      });
      res.status(200).json({
        status: true,
        message: "post disliked",
        data: deleteLike,
      });
    } else {
      console.log("Jamais liké !");
      const addLike = await prisma.like.create({
        data: {
          author: {
            connect: { id: authorId },
          },
          post: {
            connect: { id: Number(postId) },
          },
        },
      });
      res.status(200).json({
        status: true,
        message: "post liked",
        data: addLike,
      });
    }
    // res.status(200).json({
    //   status: true,
    //   message: "post déjà liké",
    //   data: isLike,
    // });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const isLike = async (req, res, nex) => {
  try {
    const { postId, authorId } = req.body;

    const userLiked = await prisma.like.findMany({
      where: {
        authorId: Number(authorId),
        postId: Number(postId),
      },
    });
    res.status(200).json({
      status: true,
      message: "User liked",
      data: userLiked,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addLike, isLike };
