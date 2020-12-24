import axios from "axios"
import settings from "../../config/appSetting"

const fetchData = (url, method, data) => {
    axios.request({url: settings.serverUrl+url, method: method, data: data})
    .then((res) => {return res})
    .catch((err) => {return err})
}

export default fetchData