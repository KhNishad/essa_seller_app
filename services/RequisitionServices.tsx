import request from '../utils/request';

async function getRewuisition() {
    const data = await request(`/requisition?page=1&take=10`)
    return data;
  }

  async function getRequisitionDetails(id:any) {
    const data = await request(`/requisition/${id}`)
    return data;
  }

  async function  offerProduct (data:any) {
    const res = await request('/requisition/seller-offer',{method:'POST',data:data})
    return res;
}


export default {getRewuisition,getRequisitionDetails,offerProduct}