
import request from '../utils/request';


async function ImageUpload(file:any) {
    console.log('..................file',file);

  const res = await request('/media/upload',{method:'POST',data:file})
  return res;
}


export default {ImageUpload}






