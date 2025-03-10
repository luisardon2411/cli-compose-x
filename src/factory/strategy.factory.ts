import { IStrategy } from '../strategies/IStrategy';
import { AngularStrategy } from '../strategies/angular.strategy';
import { DotNetStrategy } from '../strategies/dotnet.strategy';
import { SqlServerStrategy } from '../strategies/sqlserver.strategy';
import { JenkinsStrategy } from '../strategies/jenkins.strategy';
import { INetworkingConfig } from './INetworkConfig';

export class StrategyFactory {
  static createStrategy(tech: string, networkingConfig: INetworkingConfig): IStrategy {
    switch (tech) {
      case 'Angular': return new AngularStrategy(networkingConfig);
      case '.NET': return new DotNetStrategy();
      case 'SQL Server': return new SqlServerStrategy();
      case 'Jenkins': return new JenkinsStrategy();
      default: throw new Error(`Tecnología ${tech} no soportada.`);
    }
  }
}
