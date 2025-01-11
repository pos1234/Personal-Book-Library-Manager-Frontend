import qs from "qs";
export function getApiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
  }${path}`;
}

export async function fetchApi(
  path: string,
  token?:string,
  urlParamsObject = {},
  options = {},
  query = {},
) {
  try {
    // Strapi Fetch Token

    // Merge default and user options

    const mergedOptions = {
      next: {
        revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_TIME ?? 0),
        tags: ["posts"],
      }, //revalidate the cache at most every hour
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    // Build request URL

    const queryString = qs.stringify(urlParamsObject);

    const requestUrl = `${getApiURL(
      `${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call

    const response = await fetch(requestUrl, mergedOptions);

    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      //console.log"=== Status ==== ", response?.statusText);
      //console.log"=== Body ==== ", response?.body);

      // throw new Error('Failed to fetch data')
    }

    const data = await response.json();
    return data;
  } catch (error) {
    //console.log">>> Error in Fetching Data >>> ", error);
    // throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

// Services for Contact form post request

export async function postApi(
  path: string,
  data: any,
  method: "POST",
  token?:string,
  urlParamsObject = {}
) {
  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getApiURL(
    `${path}${queryString ? `?${queryString}` : ""}`
  )}`;
  
  const response = await fetch(requestUrl, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log(">>> url query",response);

  return await response.json();
}

export async function patchApi(
  path: string,
  data: any,
  method: "PATCH",
  urlParamsObject = {},
  token?:string
) {
  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getApiURL(
    `${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  const response = await fetch(requestUrl, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

export async function deleteApi(
  path: string,
  method: "DELETE",
  token?:string
) {
  // Build request URL
  const requestUrl = `${getApiURL(
    `${path}`
  )}`;

  const response = await fetch(requestUrl, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
