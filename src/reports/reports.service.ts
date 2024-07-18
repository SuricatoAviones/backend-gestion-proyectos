import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import puppeteer from 'puppeteer';
import { Project } from 'src/projects/entities/project.entity';
import { singleProject as singleTemplate, manyProjects as manyTemplate } from './templates/projects.template';

@Injectable()
export class ReportsService {

  async singleProject(project: Project) {
    return this.print(singleTemplate(project))
  };

  async manyProjects(projects: Project[]) {
   return this.print(manyTemplate(projects))
  }

  private async print(html: string) {
    const filePath = `${process.cwd()}/files/report-${(new Date()).toISOString()
      .slice(0, -5)
      .replace('T', '_')
      .replace(/:/g, '-')}.pdf`
    console.log(filePath)

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const PDF = await page.pdf({
      format: 'A3',
      scale: 1.15,
      height: '16.54in',
      width: '11.7in',
      landscape: false,
      timeout: 120000,
      printBackground: true,
      margin: {
        top: '50px',
        left: '15px',
        right: '15px',
        bottom: '50px',
      },
      path: filePath
    });
    await browser.close();
    return filePath
  }

}
