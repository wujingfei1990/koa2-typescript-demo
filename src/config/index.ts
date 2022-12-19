import dev from './dev.config';
import test from './test.config';
import prod from './prod.config';

const env = process.env.NODE_ENV || 'dev';
const obj = { dev, test, prod };

export default obj[env];
