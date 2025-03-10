import inquirer from 'inquirer';

export const askTechnologiesAndOutput = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'techs',
      message: 'Selecciona tecnologías para tu stack:',
      choices: ['Angular', '.NET', 'SQL Server', 'Jenkins'],
    },
    {
      name: 'fileName',
      message: 'Nombre del archivo generado:',
      default: 'docker-compose.yml',
      validate: input => input.endsWith('.yml') || input.endsWith('.yaml') ? true : 'Debe terminar en .yml o .yaml',
    },
    {
      name: 'outputDir',
      message: 'Ruta donde se generará el archivo:',
      default: './',
    },
  ]);

  return answers;
};
