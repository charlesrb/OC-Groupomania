const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const { request } = require("http");

const signup = async (req, res, next) => {
  const { email, name, surname, picture, bio } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    const { password, ...user } = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        surname,
        picture,
        bio,
      },
    });
    console.log(`User Created`);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return res.status(400).json({ error: "No User Found" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ error: "Wrong Password" });
  } else {
    res.status(200).json({
      userId: user.id,
      token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      }),
    });
    console.log("UserId", user.id, "Connected");
  }
};

// const updateUser = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: parseInt(id),
//     },
//     select: {
//       picture: true,
//     },
//   });
//   console.log(user.picture);

//   const filename = user.picture.split("/upload/")[1];
//   fs.unlink(`upload/${filename}`, () => {
//     const picture = `${req.protocol}://${req.get("host")}/upload/${
//       req.file.filename
//     }`;
//   });

//   const result = await prisma.user.update({
//     where: {
//       id: parseInt(id),
//     },
//     data: {
//       picture: `${req.protocol}://${req.get("host")}/upload/${
//         req.file.filename
//       }`,
//     },
//   });
//   console.log("Modify user Id:", id);
//   res.json(result);
// };

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.id !== req.user.id && req.user.isAdmin === false) {
    return res.status(403).json({ message: "Interdit" });
  }
  const result = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  console.log("Delete user Id:", id);
  res.json(result);
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // if (user.id !== req.user.id && req.user.isAdmin === false) {
  //   return res.status(403).json({
  //     message: "Interdit",
  //   });
  // }

  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },

    select: {
      name: true,
      surname: true,
      email: true,
      bio: true,
      picture: true,
    },
  });

  res.json(result);
};

// export all controllers
module.exports = {
  login,
  signup,
  deleteUser,
  getOneUser,
  // updateUser,
};
