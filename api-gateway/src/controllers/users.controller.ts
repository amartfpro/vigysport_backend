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

@Controller('users')
export class UsersProxyController {
  constructor(private readonly http: HttpService) {}

  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {
    const response = await firstValueFrom(
      this.http.get('http://users:3004/users', {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const response = await firstValueFrom(
      this.http.get(`http://users:3004/users/${id}`, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }

  @Post()
  async create(@Body() body: any, @Res() res: Response) {
    const response = await firstValueFrom(
      this.http.post('http://users:3004/users', body),
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
      this.http.put(`http://users:3004/users/${id}`, body, {
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
      this.http.delete(`http://users:3004/users/${id}`, {
        headers: { Authorization: req.headers.authorization },
      }),
    );
    return res.status(response.status).send(response.data);
  }
}
