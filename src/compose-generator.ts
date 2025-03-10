import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
import { IServiceConfig } from './strategies/IStrategy';

export class ComposeGenerator {
  private services: IServiceConfig[] = [];
  private fileName: string;
  private outputDir: string;

  constructor(fileName: string, outputDir: string) {
    this.fileName = fileName;
    this.outputDir = outputDir;
  }

  addService(service: IServiceConfig) {
    this.services.push(service);
  }

  async generate() {
    const templatePath = path.join(__dirname, 'templates/docker-compose.ejs');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    const sanitizedServices = this.services.map(service => ({
      ...service,
      command: Array.isArray(service.command) ? service.command.join(' ') : service.command,
    }));

    const outputPath = path.join(this.outputDir, this.fileName);
    const content = await ejs.renderFile(templatePath, { 
      services: sanitizedServices, 
    });
    fs.writeFileSync(outputPath, content);
  }
}
