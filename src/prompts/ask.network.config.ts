import inquirer from 'inquirer';

export async function askNetworkingConfig() {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'use_custom_network',
      message: '¿Quieres personalizar la configuración de red?',
      default: false,
    },
    {
      type: 'input',
      name: 'network_name',
      message: 'Ingrese el nombre de la red personalizada:',
      when: (answers) => answers.use_custom_network,
      default: 'custom_network',
    },
    {
      type: 'list',
      name: 'networking_mode',
      message: '¿Cómo quieres configurar la red de los servicios?',
      choices: [
        { name: 'Red compartida (comunicación entre servicios permitida)', value: 'shared' },
        { name: 'Red aislada (los servicios no pueden comunicarse entre sí)', value: 'isolated' },
      ],
      when: (answers) => answers.use_custom_network,
    },
    {
      type: 'input',
      name: 'subnet',
      message: 'Ingresa la subred a utilizar (predeterminado: 172.16.0.0/16):',
      default: '172.16.0.0/16',
      when: (answers) => answers.use_custom_network,
    },
    {
      type: 'confirm',
      name: 'use_fixed_ips',
      message: '¿Quieres asignar direcciones IP fijas a los servicios?',
      default: true,
      when: (answers) => answers.use_custom_network,
    },
  ]);

  // Si el usuario NO quiere personalizar la red, usamos valores predeterminados
  if (!answers.use_custom_network) {
    return {
      use_custom_network: false,
      network_name: 'default_network', // Nombre por defecto
      networking_mode: 'shared',
      subnet: '172.16.0.0/16',
      use_fixed_ips: false, // No se asignarán IPs fijas
    };
  }

  return answers;
}
