export const env = {
    ALCHEMY_API_KEY_MAINNET: String(import.meta.env.VITE_ALCHEMY_API_KEY_MAINNET || ''),
    ALCHEMY_API_KEY_RINKEBY: String(import.meta.env.VITE_ALCHEMY_API_KEY_RINKEBY || ''),
    AUDIUS_APP_NAME: String(import.meta.env.VITE_AUDIUS_APP_NAME || ''),
    COVALENT_API_KEY: String(import.meta.env.VITE_COVALENT_API_KEY || ''),
    ETHERSCAN_API_KEY: String(import.meta.env.VITE_ETHERSCAN_API_KEY || ''),
    FIGMENT_DATA_HUB_APP_API_KEY: String(import.meta.env.VITE_FIGMENT_DATA_HUB_APP_API_KEY || ''),
    INFURA_PROJECT_ID: String(import.meta.env.VITE_INFURA_PROJECT_ID || ''),
    MORALIS_GATEWAY_ID: String(import.meta.env.VITE_MORALIS_GATEWAY_ID || ''),
    MORALIS_WEB3_API_KEY: String(import.meta.env.VITE_MORALIS_WEB3_API_KEY || ''),
    NFTPORT_API_KEY: String(import.meta.env.VITE_NFTPORT_API_KEY || ''),
    POCKET_APP_PUBLIC_KEY: String(import.meta.env.VITE_POCKET_APP_PUBLIC_KEY || ''),
    POCKET_NETWORK_PORTAL_ID: String(import.meta.env.VITE_POCKET_NETWORK_PORTAL_ID || ''),
    POCKET_NETWORK_PASSPHRASE: String(import.meta.env.VITE_POCKET_NETWORK_PASSPHRASE || ''),
    POCKET_NETWORK_PPK: String(import.meta.env.VITE_POCKET_NETWORK_PPK || ''),
    POCKET_NETWORK_SECRET_KEY: String(import.meta.env.VITE_POCKET_NETWORK_SECRET_KEY || ''),
    TORUS_OPENLOGIN_SECRET: String(import.meta.env.VITE_TORUS_OPENLOGIN_SECRET || ''),
    TORUS_PROJECT_ID: String(import.meta.env.VITE_TORUS_PROJECT_ID || ''),
    ZAPPER_API_KEY: String(import.meta.env.VITE_ZAPPER_API_KEY || ''),
}
