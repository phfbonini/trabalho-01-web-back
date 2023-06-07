const express = require("express");
const {
  saveReceita,
  getAllReceitas,
  getReceitaById,
  updateReceita,
  deleteReceita,
  
} = require("../database/receitas");
const auth = require("../middleware/auth");
const z = require("zod");
const router = express.Router();

const ReceitaSchema = z.object({
  name: z.string({
    required_error: "Name must be required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description must be required",
    invalid_type_error: "Description must be a string",
  }),
  time: z.string({
    required_error: "Time must be required",
    invalid_type_error: "Time must be a string",
  }),
});

router.get("/ver/receitas", auth, async (req, res) => {
  console.log(req.userId)
  const receitas = await getAllReceitas(req.userId);
  res.json({
    receitas,
  })
});

router.get("/receitas/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const receita = await getReceitaById(id);
  res.json({
    receita,
  });
});

router.post("/adicionar/receitas", auth, async (req, res) => {
  try {
    const newReceita = ReceitaSchema.parse(req.body);
    const savedReceita = await saveReceita(newReceita,req.user.userId);
    res.json({
      receita: savedReceita 
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return res.status(422).json({
        message: err.errors,
      });
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/receitas/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  const receita = ReceitaSchema.parse(req.body);
  await updateReceita(id, receita);
  res.json({
    receita: updateReceita,
  });
});

router.delete("/receitas/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
   await deleteReceita(id);
  res.status(204).send();
});



module.exports = {
  router,
};
