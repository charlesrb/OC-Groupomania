const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      picture: true,
      author: {
        select: {
          id: true,
          surname: true,
          name: true,
          picture: true,
        },
      },
      likes: {
        select: {
          id: true,
          authorId: true,
          postId: true,
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
  // const { title, content, authorId } = req.body;
  const data = {
    title: req.body.title,
    content: req.body.content,
    authorId: parseInt(req.body.authorId),
  };
  console.log(req.file);
  if (req.file) {
    data.picture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  } else {
    data.picture = "";
  }
  console.log(data);
  const result = await prisma.post.create({
    data,
  });

  res.json(result);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  // const { title, content } = req.body;
  console.log(req.file);

  const data = {
    title: req.body.title,
    content: req.body.content,
  };

  if (req.file) {
    data.picture = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
    const findPost = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    const filename = findPost.picture.split("/images/")[1];
    fs.unlink(`images/${filename}`, (error) => {
      if (error) console.log(error);
      else {
        console.log("Le fichier image a ??t?? supprim??");
      }
    });
  } else {
    data.picture = "";
  }

  // const post = await prisma.post.findUnique({
  //   where: {
  //     id: parseInt(id),
  //   },
  // });

  const result = await prisma.post.update({
    where: {
      id: parseInt(id),
    },
    data,
  });
  console.log("Modify post Id:", id);
  res.json(result);
};

const deletePost = async (req, res) => {
  const { id } = req.params;

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
