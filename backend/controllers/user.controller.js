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
        picture: "http://localhost:8000/images/profil1653923427955.jpg",
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
//   try {
//     const id = req.params.id;
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     const data = {
//       surname: req.body.surname,
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       bio: req.body.bio,
//     };

//     if (req.file) {
//       picture = `${req.protocol}://${req.get("host")}/images/${
//         req.file.filename
//       }`;
//     }
//     const { password, ...user } = await prisma.user.update({
//       where: {
//         id: parseInt(id),
//       },
//       data,
//     });
//     res.status(201).json({
//       status: true,
//       message: "Profile updated !",
//       data: user,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const data = {
      surname: req.body.surname,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      bio: req.body.bio,
    };

    if (req.file) {
      data.picture = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    console.log(data);
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
    res.status(201).json({
      status: true,
      message: "Profile updated !",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = {
      disabled: req.body.disabled,
    };

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data,
    });
    res.status(201).json({
      status: true,
      message: "Profile updated !",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = {
//       disabled: req.body.disabled,
//     };
//     const user = await prisma.user.update({
//       where: {
//         id: Number(id),
//       },
//       data,
//     });
//     res.status(201).json({
//       status: true,
//       message: "Compte désactivé !",
//       data: user,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ message: error.message });
//   }
// };

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
  updateUser,
};
