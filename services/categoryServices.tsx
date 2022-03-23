
import request from '../utils/request';


async function getAllCategories() {
  const data = await request('/term/b2c/category?withChildren=true')
  return data;
}

async function getAttributeByCategory(cat:any) {
  const data = await request(`/term/attribute/associate/${cat}`)
  return data;
}




export default {getAllCategories,getAttributeByCategory}






