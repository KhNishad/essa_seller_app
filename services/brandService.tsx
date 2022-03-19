
import request from '../utils/request';


async function getAllBrand() {
  const data = await request('/term/b2c/brand')
  return data;
}




export default {getAllBrand}






