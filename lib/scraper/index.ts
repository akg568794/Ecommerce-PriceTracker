import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(url:string){
    if(!url) return;
    // BrightData proxy configuration

    // curl --proxy brd.superproxy.io:22225 --proxy-user
    // brd-customer-hl_5dd3b64f-zone-pricewise:9dj54pd60xkc -k https://Lumtest.com/myip.json
    const username=String(process.env.BRIGHT_DATA_USRNAME)
    const password=String(process.env.BRIGHT_DATA_PASSWORD)
    const port=22225;
    const session_id=(1000000 * Math.random()) | 0;
    const options={
        auth:{
            username: `${username}-session-${session_id}`,
            password,
    },
    host: 'brd.superproxy.io',
    port,
    rejectunauthorized: false
}
try{
    const response=await axios.get(url,options);
    const $=cheerio.load(response.data);
    const title=$('#productTitle').text().trim();
    console.log(title)
}catch(err:any){
    throw new Error(`falied to scrape product: ${err.message}`);

}
}