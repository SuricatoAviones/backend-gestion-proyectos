import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get()
  getProjects() {
    return this.reportsService.getProjects();
  }

  @Get()
  getProject() {
    return this.reportsService.getProject();
  }
}
