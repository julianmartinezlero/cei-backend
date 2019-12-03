import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { TutorService } from './tutor.service';
import { Tutor } from '../entity/tutor.entity';
import { ChildService } from '../child/child.service';

@Controller('tutor')
export class TutorController implements Crud {
  constructor(private readonly tutorService: TutorService,
              private readonly childService: ChildService) {
  }

  @Get()
  all(): Promise<Tutor[]> {
    return this.tutorService.all();
  }

  @Post()
  create(@Body() tutor: Tutor) {
    const t: any = {
      id: null,
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      email: tutor.email,
      password: tutor.password,
      createdAt: new Date(),
      updatedAt: new Date(),
      children: tutor.children,
    };
    const tutorCreate = this.tutorService.create(t);
    return tutorCreate.then(result => {
      tutor.children.map(c => {
        c.tutorId = result.identifiers[0].id;
        // filebase64.decode(c.photo, 'text.new.txt', (erro, out) => {
        //  c.photo = out;
        //  fs.writeFile(c.photo., (err) => {
        //     console.log('Successfully Written to File.');
        //   });
        // });
      });
      // console.log;
      return this.childService.create(tutor.children);
    });
  }

  @Get(':id')
  show(@Param() params) {
    return this.tutorService.show(params.id);
  }

  @Put(':id')
  update(@Param() params, @Body() tutor) {
    const w = {
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      email: tutor.email,
      password: tutor.password,
      updatedAt: new Date(),
    };
    return this.tutorService.update(params.id, w);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.tutorService.delete(params.id);
  }

  @Get('search/:name')
  search(@Param() param) {
    return this.tutorService.search(param.name);
  }
}
