
import request from '../utils/request';


async function ImageUpload(file:any) {
  
   
  const data = await request('/media/upload',{method:'POST',data:file})
  return data;
}


export default {ImageUpload}






