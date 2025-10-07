import { Request, Response, Router } from 'express';
import Todo, { ITodo, ITodoCreate } from '../models/Todo';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const todos = await Todo.find();

  todos.sort((a: ITodo, b: ITodo) => {
    if (a.completed === b.completed) return 0;
    if (a.completed) return 1;
    return -1;
  });

  res.render('index', { todos });
});

router.post('/add', async (req: Request, res: Response) => {
  const { title } = req.body as ITodoCreate;
  if (title) {
    await Todo.create({ title });
  }
  res.redirect('/');
});

router.post('/toggle/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (todo) {
    todo.completed = !todo.completed;
    await todo.save();
  }

  res.redirect('/');
});

router.post('/delete/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);

  res.redirect('/');
});

export default router;
