import { IStrategy, IServiceConfig } from './IStrategy';
import inquirer from 'inquirer';

export class JenkinsStrategy implements IStrategy {
  async getConfig(): Promise<IServiceConfig> {
    const answers = await inquirer.prompt([
      { name: 'version', message: 'Versión Jenkins:', default: 'lts' },
      { name: 'container_name', message: 'Nombre contenedor Jenkins:', default: 'jenkins_ci' },
      { name: 'port', message: 'Puerto Jenkins:', default: '8080' },
    ]);

    return {
      name: 'jenkins',
      image: `jenkins/jenkins:${answers.version}`,
      container_name: answers.container_name,
      ports: [`${answers.port}:8080`],
      volumes: ['jenkins_home:/var/jenkins_home'],
    };
  }
}
