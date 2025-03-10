import { Command } from 'commander';
import { askTechnologiesAndOutput, askNetworkingConfig } from './prompts';
import { StrategyFactory } from './factory/strategy.factory';
import { INetworkingConfig } from './factory/INetworkConfig';
import { ComposeGenerator } from './compose-generator';
import { logo } from './logo';

console.log(logo);

const program = new Command();
program.name('compose-X').version('1.0.0');

program.command('generate').action(async () => {
  const { techs, fileName, outputDir } = await askTechnologiesAndOutput();
  const networkingConfig: INetworkingConfig = await askNetworkingConfig();
  const generator = new ComposeGenerator(fileName, outputDir, networkingConfig);
  for (const tech of techs) {
    const strategy = StrategyFactory.createStrategy(tech, networkingConfig);
    const config = await strategy.getConfig();
    generator.addService(config);
  }

  await generator.generate();
  console.log(`🚀 Archivo ${fileName} generado con éxito en ${outputDir}`);
});

program.parse(process.argv);
