import { INetworkingConfig } from '../factory/INetworkConfig';
import { IStrategy, IServiceConfig } from './IStrategy';
import inquirer from 'inquirer';

export class AngularStrategy implements IStrategy {

  async getConfig(): Promise<IServiceConfig> {
    const answers = await inquirer.prompt([
      { name: 'version', message: 'Angular (Node) versión:', default: '20' },
      { name: 'container_name', message: 'Nombre contenedor Angular:', default: 'angular_frontend' },
      { name: 'port', message: 'Puerto Angular:', default: '4200' },
    ]);

    return {
      name: 'frontend',
      image: `node:${answers.version}`,
      container_name: answers.container_name,
      ports: [`${answers.port}:4200`],
      volumes: ['./frontend:/app'],
      command: ['npm', 'start'],
    };
  }
}
