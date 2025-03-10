import { IStrategy, IServiceConfig } from './IStrategy';
import inquirer from 'inquirer';

export class SqlServerStrategy implements IStrategy {
  async getConfig(): Promise<IServiceConfig> {
    const answers = await inquirer.prompt([
      { name: 'version', message: 'SQL Server versión:', default: '2022-latest' },
      { name: 'container_name', message: 'Nombre contenedor SQL Server:', default: 'sqlserver_db' },
      { name: 'port', message: 'Puerto SQL Server:', default: '1433' },
      { name: 'sa_password', message: 'Contraseña SA SQL Server:', default: 'SqlServer!123' },
    ]);

    return {
      name: 'database',
      image: `mcr.microsoft.com/mssql/server:${answers.version}`,
      container_name: answers.container_name,
      ports: [`${answers.port}:1433`],
      environment: {
        ACCEPT_EULA: 'Y',
        MSSQL_SA_PASSWORD: answers.sa_password,
      },
      volumes: ['sqlserver_data:/var/opt/mssql'],
    };
  }
}
