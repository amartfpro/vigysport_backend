import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('products')
export class ProductsProxyController {
  constructor(private readonly http: HttpService) {}

  @Get()
  async getAll(@Res() res: Response) {
    const response = await firstValueFrom(
      this.http.get('http://products:3003/products'),
    );
    return res.status(response.status).send(response.data);
  }

  @Get(':id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const response = await firstValueFrom(
      this.http.get(`http://products:3003/products/${id}`),
    );
    return res.status(response.status).send(response.data);
  }

  @Post()
  async create(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    const response = await firstValueFrom(
      this.http.post('http://products:3003/products', body, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await firstValueFrom(
      this.http.put(`http://products:3003/products/${id}`, body, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await firstValueFrom(
      this.http.delete(`http://products:3003/products/${id}`, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }
}
