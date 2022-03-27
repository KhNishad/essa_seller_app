
import request from '../utils/request';


async function ImageUpload(file:any) {
    console.log('..................file',file);

  const res = await request('/media/upload',{method:'POST',data:file})
  return res;
}
async function ProductUp(data:any) {

   const res = await request('/product',{method:'POST',data:data})
   return res;
}

async function ProductList() {

  const res = await request('/product')
  return res;
  }

async function ProductDetails(id:any) {

    const res = await request(`/product/${id}?withDetails=true`)
    return res;
    }

async function productUpdate(id:any,data:any) {

      const res = await request(`/product/${id}`,{method:'PUT',data:data})
      return res;
      }




export default {ImageUpload,ProductUp,ProductList,ProductDetails,productUpdate}






