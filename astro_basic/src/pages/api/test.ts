
import { ApiRoute } from "astro";

export async function GET({ request,params ,query,cookies, redirect, }) {
     // Process the URL into a more usable format
        const url = new URL(request.url);
        const queryParams = new URLSearchParams(url.search);

        // Set up a response object
        const parabObj = {};

        // Iterate over all query parameters and add them to the response object
        for (const [key, value] of queryParams) {
            parabObj[key] = value;
        }

        // read cookie
        const access_token =  cookies.get('access_token');
        

        // set cookie
        const cookieValue =  "newCookieValue " + new Date() 
        cookies.set('access_token', cookieValue , { path: '/' });
        
    // Access 'api_access_token' from headers
    const api_access_token = request.headers.get('api_access_token');


    const result = {
        success:true,
        message:"Api is responsing...",
        data:{params,parabObj,cookies, api_access_token,access_token}
    }

  return new Response(
    JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

export const POST:APIRoute = async({ request,params,query })=> {
    const body = await request.json()
    const result = {
        success:true,
        message:"Api is responsing...",
        data: {body,params}
    }
  return new Response(
    JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}