const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
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
      createdAt: "desc",
    },
  });

  res.json(posts);
};

const getOnePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      author: {
        select: {
          id: true,
          surname: true,
          name: true,
          picture: true,
        },
      },
    },
  });

  res.json(post);
};

const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  res.json(result);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  if (post.authorId !== req.user.id && req.user.role === false) {
    return res.status(403).json({
      message: "Interdit",
    });
  }
  const result = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title,
      content,
    },
  });
  console.log("Modify post Id:", id);
  res.json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (post.authorId !== req.user.id && req.user.role === false) {
    return res.status(403).json({ message: "Interdit" });
  }
  const result = await prisma.post.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Delete post Id:", id);
  res.json(result);
};

// export all controllers
module.exports = { getPosts, getOnePost, createPost, updatePost, deletePost };
