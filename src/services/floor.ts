import request from '@/utils/request';

export async function queryFloor(): Promise<any> {
  return request.post('http://127.0.0.1:9100/Sch/getSchAll',{
    data:{
      schId:'5'
    }
  });
}
