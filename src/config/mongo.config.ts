import dotenv from 'dotenv';

dotenv.config();

const mongoConfig = {
    url:"mongodb://127.0.0.1:27017/crud"
};

export default mongoConfig;
