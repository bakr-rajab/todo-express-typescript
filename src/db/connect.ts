import { connect, connection } from 'mongoose';
import mongoConfig from '../config/mongo.config';

const mongoConnect = async (): Promise<void> => {
    try {
        await connect(
            mongoConfig.url
        );
        process.on('exit', function () {
            connection.close();
        });
    } catch (error) {
        console.log("error in mongo connection", error);
    }
};

export default mongoConnect;
