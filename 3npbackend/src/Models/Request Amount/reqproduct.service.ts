import { Injectable, Session, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestProEntity } from "./requestpro.entity";
import { Repository } from "typeorm";
import { RequestProDTO, RequestProDisDTO } from "./requestpro.dto";
import { ProfileEntity } from "../All Profile/profile.entity";
import { NoRequestAvailable } from "./reqproduct.error";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import * as puppeteer from 'puppeteer';
import { Product } from "../Distributor Product/Product.model";

@Injectable()
export class RequestProService{
  private readonly CACHE_KEY_VEG = 'chaldal:fresh-produce-veg';
  private readonly CACHE_KEY_FISHMEAT = 'chaldal:fresh-produce-fishmeat';
  constructor(
    @InjectRepository(RequestProEntity) private productRepo: Repository<RequestProEntity>,
    @InjectRepository(ProfileEntity) private profileRepo: Repository<ProfileEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ){}

  
 /* async addIndustry(profileInfo:ProductDTO):Promise<ProductEntity[]>
  {
   const res = await this.productRepo.save(profileInfo);
   return this.productRepo.find();
  } */

  async addrequestAmount(productinfo)
  {
   // const res = await this.productRepo.save(Productdto);
    return this.productRepo.save(productinfo);
  }

  async addrequestAmountDis(requestpro:RequestProDisDTO,@Session() session):Promise<RequestProEntity|null>
  {
   // const res = await this.productRepo.save(Productdto);
   try{
      const isindustry = await this.profileRepo.findOne({where: {
          name:requestpro.industry_name,
        },
      })
      const req:RequestProDTO={
        industry_name:requestpro.industry_name,
        distributor_name:session.user.name,
        requested_quantity:requestpro.requested_quantity,
        product_name: requestpro.product_name,
        delivered_quantity: 0
        
      };

      try{
        const res = await this.productRepo.save(req)
        return res;
      }
      catch(error){
        console.log(error)
      }


    }
    catch(error){
      console.log(error)
    }
   }

   async viewProRequestIND(name: string) {

    // Fetch data from the table where industry_name matches the provided name
    const res = await this.productRepo.find({
      where: { industry_name: name },
      select: [
        'request_id',
        'industry_name',
        'product_name',
        'distributor_name',
        'requested_quantity',
        'delivered_quantity',
      ],
    });

  if(res.length === 0)
  {
    throw new NoRequestAvailable();
  }
  else
  {
    return res;
  }   
}
    public async getChaldalDataVeg(): Promise<Product[]> {
    // 1) Try to read from cache
      const cached: Product[] = await this.cacheManager.get(this.CACHE_KEY_VEG);
      if (cached) {
        return cached;
      }

      // 2) Not in cache → scrape both pages
      const browser = await puppeteer.launch();
      var data: Product[] = [];

      data = await this.scrape('https://chaldal.com/fresh-vegetable', browser, data);
      data = await this.scrape('https://chaldal.com/fresh-fruit',browser, data);
      await browser.close();
      console.log(data);

      // 3) Store in cache for next time
      await this.cacheManager.set(this.CACHE_KEY_VEG, data, 3600 * 1000);
      
      return data;
  }

  public async getChaldalDataFishMeat(): Promise<Product[]> {
    // 1) Try to read from cache
      const cached: Product[] = await this.cacheManager.get(this.CACHE_KEY_FISHMEAT);
      if (cached) {
        return cached;
      }

      // 2) Not in cache → scrape both pages
      const browser = await puppeteer.launch();
      
      var data: Product[] = [];
      // helper to scrape one URL
      data = await this.scrape('https://chaldal.com/chicken-poultry', browser, data);
      data = await this.scrape('https://chaldal.com/premium-perishables', browser, data);
      data = await this.scrape('https://chaldal.com/dried-fish', browser, data);
      data = await this.scrape('https://chaldal.com/frozen-fish', browser, data);
      data = await this.scrape('https://chaldal.com/tofu-meat-alternatives', browser, data);
      data = await this.scrape('https://chaldal.com/meat-new', browser, data);

      await browser.close();

      // 3) Store in cache for next time
      await this.cacheManager.set(this.CACHE_KEY_FISHMEAT, data, 3600 * 1000);
      return data;
  }

   public async scrape(url: string, browser: puppeteer.Browser, data: Product[]) : Promise<Product[]> {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const items = await page.$$('[class^="product"]');
    for (const item of items) {
      const name = (await item.$eval('[class^="name"]', el => el.textContent)).trim();
      const quantity = (await item.$eval('[class^="subText"]', el => el.textContent)).trim();
      const price = (await item.$eval('[class^="price"]', el => el.textContent)).trim();

      if (!data.find(p => p.name === name && p.quantity === quantity && p.price === price)) {
        data.push({ name, quantity, price });
      }
    }
    return data;
  }

}