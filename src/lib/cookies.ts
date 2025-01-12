'use client'

export const getCookie = (name: string | number) => {
    if(typeof window != undefined){
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ').reduce((acc:any, cookie) => {
          const [key, value] = cookie.split('=');
          acc[key] = value;
          return acc;
        }, {});
        
        return cookies[name] ? decodeURIComponent(cookies[name]) : null;
    }
  };
export const setUserDataCookie = (data:any)=>{
    if(typeof window != undefined){
        document.cookie = `user_data=${encodeURIComponent(data)}; Path=/; Secure; SameSite=Strict`;
    }
}
export const removeCookie = () => {
  if (typeof window !== 'undefined') {
    document.cookie = `user_data=; Path=/; Max-Age=0; Secure; SameSite=Strict`;
  }
};
