import cookie from "cookie";

export async function getCookie (req) {
  let data = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  if (Object.keys(data).length !== 0 && 'user' in data) {
    data = JSON.parse(data?.user);
  }

  return {
    data,
  };
};

