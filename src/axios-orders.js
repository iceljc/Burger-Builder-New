import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-react-ljc-default-rtdb.firebaseio.com/"
});

export default instance;