import request from '@/utils/request';

export async function queryFloor(): Promise<any> {
  return request('http://127.0.0.1/app/sch/tofloor?schId=1');
}
