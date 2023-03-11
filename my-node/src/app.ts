import express, { NextFunction, Request, Response } from 'express';
// 这里采用 ES 模块写法, TS 会自动转换为 Node.js 可识别的模块语法

import todoRoutes from './routes/todos';

const app = express();

app.use('/todos', todoRoutes);

// error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: err.message });
});

app.listen(3000);
