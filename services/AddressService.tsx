
import request from '../utils/request';


async function getZone() {
  const data = await request('/term/zone')
  return data;
}
async function getRegionByZone(id:any) {
  
    const data = await request(`/term/zone/${id}?withChildren=true`)
    return data;
  }
  async function getTeritoryByregion(id:any) {
  
    const data = await request(`/term/region/${id}?withChildren=true`)
    return data;
  } 

  async function getSellerProfile() {
  
    const data = await request(`/seller/info`)
    return data;
  }

  async function updateSellerProfile(id:any) {
  console.log(',..........seller',id);
  
    const data = await request(`/seller/${id}`,{method:'PUT'})
    return data;
  }

  


export default {getZone,getRegionByZone,getTeritoryByregion,getSellerProfile,updateSellerProfile}






