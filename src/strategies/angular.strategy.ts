import { INetworkingConfig } from '../factory/INetworkConfig';
import { IStrategy, IServiceConfig } from './IStrategy';
import inquirer from 'inquirer';

export class AngularStrategy implements IStrategy {

  constructor( private networkingConfig: INetworkingConfig ){}

  async getConfig(): Promise<IServiceConfig> {
    const answers = await inquirer.prompt([
      { name: 'version', message: 'Angular (Node) versión:', default: '20' },
      { name: 'container_name', message: 'Nombre contenedor Angular:', default: 'angular_frontend' },
      { name: 'port', message: 'Puerto Angular:', default: '4200' },
      { name: 'ip', message: 'IP en la red personalizada (opcional):', when: this.networkingConfig.use_fixed_ips },
    ]);

    return {
      name: 'frontend',
      image: `node:${answers.version}`,
      container_name: answers.container_name,
      ports: [`${answers.port}:4200`],
      volumes: ['./frontend:/app'],
      command: ['npm', 'start'],
      networks: {
        name: this.networkingConfig.network_name,
        ipv4_address: this.networkingConfig.network_name ? answers.ip : undefined
      }
    };
  }
}
