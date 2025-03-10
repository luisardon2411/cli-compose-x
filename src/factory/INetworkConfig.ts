export interface INetworkingConfig {
    use_custom_network: boolean; // Define si se usa red personalizada o no
    network_name: string; // Nombre de la red (puede ser personalizada o predeterminada)
    networking_mode: 'shared' | 'isolated'; // Red compartida o aislada
    subnet: string; // Subred personalizada
    use_fixed_ips: boolean; // Si se usan IPs fijas
}
