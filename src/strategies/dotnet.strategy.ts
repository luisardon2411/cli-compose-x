import { IStrategy, IServiceConfig } from './IStrategy';
import inquirer from 'inquirer';

export class DotNetStrategy implements IStrategy {
  async getConfig(): Promise<IServiceConfig> {
    const answers = await inquirer.prompt([
      { name: 'version', message: '.NET SDK versión:', default: '7.0' },
      { name: 'container_name', message: 'Nombre contenedor .NET:', default: 'dotnet_backend' },
      { name: 'port', message: 'Puerto .NET:', default: '5000' },
    ]);

    return {
      name: 'backend',
      image: `mcr.microsoft.com/dotnet/sdk:${answers.version}`,
      container_name: answers.container_name,
      ports: [`${answers.port}:5000`],
      volumes: ['./backend:/app'],
      command: ['dotnet', 'watch', 'run'],
    };
  }
}
