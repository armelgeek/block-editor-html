import { apiPrefix } from "@/config/constant";
import { timeout } from "../options";
import { httpFetch } from "../request";
export default {
    getMusicUrl(url:string) {
        return  fetch(url,{
          mode: 'no-cors',
          credentials: 'include'
        })
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
          return blob;
        })
      },
};
