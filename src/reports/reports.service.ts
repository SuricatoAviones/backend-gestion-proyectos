import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';


@Injectable()
export class ReportsService {



  async getProject() {
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
      margin: {
        top: '50px',
        left: '15px',
        right: '15px',
        bottom: '50px',
      },
    });
    await browser.close();
    return PDF.toString('base64');
  }


  async getProjects() {
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
      margin: {
        top: '50px',
        left: '15px',
        right: '15px',
        bottom: '50px',
      },
    });
    await browser.close();
    return PDF.toString('base64');
  }
}
