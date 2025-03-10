export interface IServiceConfig {
    name: string;
    image: string;
    container_name: string;
    ports: string[];
    volumes?: string[];
    environment?: Record<string, string>;
    command?: string[];
    networks?: {
        name: string;
        ipv4_address?: string;
    }
}

export interface IStrategy {
    getConfig(): Promise<IServiceConfig>;
}
