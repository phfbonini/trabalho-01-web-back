const prisma = require("./prisma");

const getAllReceitas = (userId) => {
  return prisma.receitas.findMany({
    where: {
      userId
    },
  });
};

const getReceitaById = (id) => {
  return prisma.receitas.findFirst({
    where: {
      id: id,
    },
  });
};

const saveReceita = (receita, userId) => {
  return prisma.receitas.create({
    data: {
      name: receita.name,
      description: receita.description,
      time: receita.time,
      userId
    }
  });
};

const updateReceita = (id, receita) => {
  return prisma.receitas.update({
    where: {
      id: id,
    },
    data: receita,
  });
};

const deleteReceita = (id) => {
  return prisma.receitas.delete({
    where: {
      id: id,
    },
  });
};


module.exports = {
  saveReceita,
  getAllReceitas,
  getReceitaById,
  updateReceita,
  deleteReceita,
};
