import { Body, Controller, Get, Param, Query, Post, Put,Delete, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, ParseIntPipe, Res, Session, NotFoundException, UnauthorizedException, UnprocessableEntityException, UseGuards, Patch, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from "multer";
import { Login, ProfileDTO, ProfileDTODis, UpdateDisDTO, UpdateNameDTO, UpdatePhoneDTO, UpdateRegionDisDTO, UpdatepasswordDTO } from 'src/Models/All Profile/profile.dto';
import { ProfileEntity } from 'src/Models/All Profile/profile.entity';
import { ProfileService } from 'src/Models/All Profile/profile.service';
import { VerificationDTO, VerificationDisDTO } from 'src/Models/Verification/verification.dto';
import { NotanyRedlistedDributor, NotanyRedlistedIndustry } from 'src/Models/Red Lists/redlist.error';
import { VerificationService } from 'src/Models/Verification/verification.service';
import { LicenseNumberExistsError, ProfileAlreadyVerifiedError, ProfileMismatchError, ProfiledoesnotExistsError } from 'src/Models/Verification/verification.errors';
import { SessionGuardDis } from './SessionDisGaurd.gaurd';
import session from 'express-session';
import { RedListDTO } from 'src/Models/Red Lists/redlist.dto';
import { RedListService } from 'src/Models/Red Lists/redlist.service';
import { Router } from 'express';
import { DeleteProduct, DisAddProductDto, DisProductDTO, updateProductPrice, updateProductQuantity } from 'src/Models/Distributor Product/disproduct.dto';
import { DisProductEntity } from 'src/Models/Distributor Product/disproduct.entity';
import { DisProductService } from 'src/Models/Distributor Product/disproduct.service';
import { productAlreadyExist, productNotaAddedExist } from 'src/Models/Distributor Product/disproduct.error';
import { quantityDelbyDisDTO } from 'src/Models/Delivered Quantity/delquantity.dto';
import { DelquantityEntity } from 'src/Models/Delivered Quantity/delquantity.entity';
import { DelquantityService } from 'src/Models/Delivered Quantity/delquantity.service';
import { VerificationEntity } from 'src/Models/Verification/verification.entity';
import { RequestProDisDTO } from 'src/Models/Request Amount/requestpro.dto';
import { RequestProService } from 'src/Models/Request Amount/reqproduct.service';
import { RequestProEntity } from 'src/Models/Request Amount/requestpro.entity';
import { ReportandNoticeDisDTO, ReportandNoticePostDisDTO } from 'src/Models/Report and Notice/reportandnotice.dto';
import { ReportandNoticeService } from 'src/Models/Report and Notice/reportandnotice.service';
import { ReportandNoticeEntity } from 'src/Models/Report and Notice/reportandnotice.entity';
import { DeleteResult } from 'typeorm';
import { RedListEntity } from 'src/Models/Red Lists/redlist.entity';
import puppeteer from 'puppeteer';
import { CacheTTL } from '@nestjs/cache-manager';

@Controller("users/distributor")
export class DistributorController {
  constructor(private readonly profileservice: ProfileService,
    private readonly verificationservice: VerificationService,
    private readonly redlistservice: RedListService,
    private readonly distributorservice: DisProductService,
    private readonly delquantityservice: DelquantityService,
    private readonly requestproservice: RequestProService,
    private readonly reportandnoticeservice: ReportandNoticeService
    ) {}

  
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: Login, @Session() session): Promise<ProfileEntity | { message: string }> {
    const user = await this.profileservice.getUserLoginInfoByEmail(data.email);

    if (user != null) {
      const res = await this.profileservice.login(data.password, user.password);

      if (res) {
        if (user.role === 'Distributor') {
          session.user = user;
          return user;
        } else {
          throw new UnauthorizedException({ message: 'User is not authorized' });
        }
      } else {
        throw new NotFoundException({ message: 'Email or Password did not match' });
      }
    } else {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }

  @Post('addDistributor')
  @UsePipes(new ValidationPipe())
  async addDis(@Body() disInfo: ProfileDTODis) {
    const { license_number, phone_number, email } = disInfo;
    const sendRes = {
      success: "False",
      message: "",
      data: {},
    };

    if (!(await this.profileservice.isProfileUnique(license_number, phone_number, email))) {

      sendRes.message = 'Profile with the same license number, phone, or email already exists.';
      return sendRes;
    }
    const result = await this.profileservice.addDistributor(disInfo);
    if(result.message !== "") sendRes.message=result.message;
    
    else {sendRes.data=result;sendRes.success = "True";}
    return sendRes;
  }

  @Get('checkDisVerification')
  @UseGuards(SessionGuardDis)
  async checkDisVerification(@Session() session): Promise<VerificationEntity| { message: string }> { 
    const user = session.user;
    console.log("lisence",user);
    if(user.role==="Distributor")
    {
      
      try {
        
        const verified = await this.verificationservice.checkVerificationDis(user.uid)
        
        return verified;
      }
      catch(error)
      {
        throw error;
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get('checkDisRedList')
  @UseGuards(SessionGuardDis)
  async checkDisRedlist(@Session() session): Promise<RedListDTO| { message: string }> { 
    const user = session.user;

    if(user.role==="Distributor")
    {
      
      try {
        
        const redlisted = await this.redlistservice.checkDis(user.name)
        
        if(redlisted){
          
          return redlisted;
        }
        else{
          return { message: 'You are not red listed'};
        }
      }
      catch(error)
      {
        if (error instanceof ProfiledoesnotExistsError){
          return { message: 'Invalid Request' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Post("addProduct")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async addProduct(@Body() product: DisAddProductDto, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    
    const pro: DisProductDTO = {
          distributor_name : session.user.name,
          product_name : product.product_name,
          product_quantity : product.product_quantity,
          distributor_price : product.distributor_price
    };
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.distributorservice.addDistributorProductInfo(pro,session)
        if(productver){
          
          return productver;
        }
        else{
          return { message: 'Product not Added to inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
        if(error instanceof productAlreadyExist){
          return { message: 'This product already exist' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewinventory")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewinventory(@Session() session): Promise<DisProductEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        //const products = await this.distributorservice.showDistributorProducts(session.user.name)
        const products = await this.distributorservice.showDistributorProducts(user.name);
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
   // else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Patch("updateproductquantity")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async updateProductQuantity(@Body() product: updateProductQuantity, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.distributorservice.updateProduct(product,session)
        console.log(productver)
        if(productver){
          
          return  productver;
        }
        else{
          return { message: 'Product not updated in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product found in inventory with such name' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Patch("updateproductprice")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async updateProductPrice(@Body() product: updateProductPrice, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    console.log(product);
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.distributorservice.updateProduct(product,session)
        //console.log(productver)
        if(productver){
          
          return productver;
        }
        else{
          return { message: 'Product not updated in inventory'};
        }
      }
      catch(error)
      {
        throw error;
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Post("delivaryproduct")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async delivaryProduct(@Body() product: quantityDelbyDisDTO, @Session() session): Promise<DisProductEntity | { message: string }>{
    const user = session.user;
    if(user.role==="Distributor")
    {
      try {
        
        const productver = await this.delquantityservice.addDeliveredQuantityDis(product,session)
        //console.log(productver)
        if(productver){
          
          return productver;
        }
        else{
          throw BadRequestException;
        }
      }
      catch(error)
      {
        throw error;
      }
  
    }
    else
    {
      throw UnauthorizedException;
  
    }
  }

  @Patch('/updatedisprofile')
  @UseGuards(SessionGuardDis)
  async updatedisprofile(@Body((new ValidationPipe()))ProfileInfo:UpdateDisDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;
  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const updateadmininfo = await this.profileservice.updateDisInfo(ProfileInfo, id);
      return updateadmininfo;
    }
  } catch (error) {
    console.error(error);

    if (error instanceof ProfiledoesnotExistsError) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "An unexpected error occurred." };
    }
  }

}

@Patch('updatedisname')
@UseGuards(SessionGuardDis)
async updateDisName(@Body((new ValidationPipe()))name:UpdateNameDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatename(name, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}




@Patch('/updatedisaddress')
@UseGuards(SessionGuardDis)
async updateDisAddress(@Body((new ValidationPipe()))address, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updateaddress(address, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Patch('/updatedisphonenumber')
@UseGuards(SessionGuardDis)
async updateDisPhoneNumber(@Body((new ValidationPipe()))phonenumber:UpdatePhoneDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatephonenumber(phonenumber, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}



@Patch('/updatedispassword')
@UseGuards(SessionGuardDis)
async updateDisPassword(@Body((new ValidationPipe()))password:UpdatepasswordDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (!session) {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.updatepassword(password, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Post('/uplodlicensedis')
  @UseGuards(SessionGuardDis)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file_location_name', {
    fileFilter: (req, file, cb) => {
      if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
        cb(null, true);
      } else {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      }
    },
    limits: { fileSize: 30000000000 },
    storage: diskStorage({
      destination: './upload',
      filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
      },
    }),
  }))
  async addVerification(
    @Body() verificationInfo: VerificationDisDTO,
    @UploadedFile() myfile: Express.Multer.File,
    @Session() session
  ) {
    verificationInfo.file_location_name = myfile.filename;
    verificationInfo.license_number = session.user.license_number;
  
    const user = session.user;
  
    if (user) {
      // Check if the user is an Admin
      if (user.role === 'Distributor') {
        // Pass the user ID from the session to verificationInfo
  
        try {
          const result = await this.verificationservice.addVerificationDis(verificationInfo,session.user.id);
          return { success: true, message: 'License Uploaded Successfully' };
        } catch (error) {
          if (error instanceof ProfileAlreadyVerifiedError) {
            return { success: false, message: 'Profile is already verified' };
          } else if (error instanceof LicenseNumberExistsError) {
            return { success: false, message: 'License number already exists.' };
          } else if (error instanceof ProfileMismatchError) {
            return { success: false, message: 'User ID and license number do not match with the profile.' };
          } else {
            return { success: false, message: 'An error occurred while adding the verification.' };
          }
        }
        
      } else {
        return { success: false, message: 'Access denied. You are not authorized to perform this action.' };
      }
    } else {
      return { success: false, message: 'User is not authenticated.' };
    }
  }

  @Get("viewiindustrylist")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewIndustryList(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallIndustrynameDis(session)
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewiindustrylistReg")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewIndustryListReg(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallIndustrynameRegDis(session)
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewiDistributorlist")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewDistributorList(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallDistributorNameDis();
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewiDistributorlistReg")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewDistributorListReg(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallDistributornameRegDis(session);
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewiAdminlist")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewAdminList(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallAdminNameDis();
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get("viewiAdminlistReg")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async viewAdminListReg(@Session() session): Promise<ProfileEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        const products = await this.profileservice.ViewallAdminnameRegDis(session);
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
    else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Patch('/updatedisregion')
  @UseGuards(SessionGuardDis)
  async updateDisRegion(@Body((new ValidationPipe()))region:UpdateRegionDisDTO, @Session() session): Promise<ProfileEntity | { message: string } | { success: boolean }>{
    const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const user = session.user;
      const id = user.uid;
      const profile = await this.profileservice.UpdateRegionDis(region, id);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Post('requestproduct')
@UseGuards(SessionGuardDis)
async requestProduct(@Body((new ValidationPipe()))requestProduct:RequestProDisDTO, @Session() session): Promise<RequestProEntity | { message: string } | { success: boolean }>{
  const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const profile = await this.requestproservice.addrequestAmountDis(requestProduct,session);
      return profile;
    }
  } catch (error) {
    console.error(error);

    if (error) {
      return { success: false, message: "An unexpected error occurred." };
    }
  }
}

@Post('reportadmin')
@UseGuards(SessionGuardDis)
async reportAdmin(@Body((new ValidationPipe()))notice:ReportandNoticePostDisDTO, @Session() session): Promise<ReportandNoticeEntity | { message: string } | { success: boolean } | {error:string}>{
  const user = session.user;

  try {
    if (user.role!=="Distributor") {
      throw new UnauthorizedException("User is not authorized");
    } else {
      const sendnotice:ReportandNoticeDisDTO={
        name:user.name,
        reporterrole:user.role,
        receiver:notice.receiver,
        reportornotice:notice.reportornotice,
        type:notice.type
      }
      const profile = await this.reportandnoticeservice.noticeandreportDis(sendnotice,session.user.uid)
      return profile;
    }
  } catch (error) {
    throw error;
  }
}

@Delete("deletestockproduct")
@UsePipes(new ValidationPipe())
@UseGuards(SessionGuardDis)
async deleteStockProduct(@Query('product_name') producte: string, @Session() session): Promise<DisProductEntity | { message: string }|DeleteResult>{
  const user = session.user;
  const product ={
    product_name:producte
  }
  console.log(product);
  if(user.role==="Distributor")
  {
    try {
      
      const productver = await this.distributorservice.deleteProduct(product,session)
      console.log(productver)
      if(productver){
        
        return  productver;
      }
      else{
        return { message: 'Product not updated in inventory'};
      }
    }
    catch(error)
    {
      if (error instanceof productNotaAddedExist){
        return { message: 'No product found in inventory with such name' };
      }
    }

  }
  else
  {
    return { message: 'You are a Unauthorized User' };

  }
}

@Get('logout')
@UseGuards(SessionGuardDis)
async logout(@Session() session) {
  if (session.user) {
    
    session.destroy();
    return { message: 'Logout successful' };
  } else {
    return { message: 'No user in the session' };
  }
}

@Get('viewprofile')
  @UseGuards(SessionGuardDis)
  async viewprofile(@Session() session): Promise<ProfileEntity>  {
    const user = session.user;
    if (user)
    {
      if (user.role === 'Distributor')
      {
        const res = await this.profileservice.viewprofile(user.uid);
        return res;
      }
      else{
        return user;
      }
    }
    else{
      throw new BadRequestException();
    }
 
  }

  @Get('redlistedindustry')
  @UseGuards(SessionGuardDis)
  async RedlisteddistributorIND(@Session() session): Promise<RedListEntity[]| { message: string }> { 
    const user = session.user;
    if(user.role=="Distributor")
    {
      try {
        const redlistEntity = await this.redlistservice.redlisteindustryIND();
        if(redlistEntity.length !== 0)
        {
          return redlistEntity;
        }
      }
      catch(error)
      {
        if (error instanceof NotanyRedlistedDributor){
          return { message: 'There is not any RedListed Ditributor.' };
        }
      }
  
    }
    //else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  } 

  @Get("deliveredquantity")
  @UsePipes(new ValidationPipe())
  @UseGuards(SessionGuardDis)
  async deliveredQuantity(@Session() session): Promise<DelquantityEntity[] | { message: string }>{
    const user = session.user;
    
    if(user.role==="Distributor")
    {
      try {
        
        //const products = await this.distributorservice.showDistributorProducts(session.user.name)
        const products = await this.delquantityservice.DeliveredQuantityDis(user);
        console.log(products)
        if(products){
          
          return products;
        }
        else{
          return { message: 'No product in inventory'};
        }
      }
      catch(error)
      {
        if (error instanceof productNotaAddedExist){
          return { message: 'No product added' };
        }
      }
  
    }
   // else
    {
      return { message: 'You are a Unauthorized User' };
  
    }
  }

  @Get('getChaldalDataVeg')
  async getChaldalData() {
    var data = this.requestproservice.getChaldalDataVeg();
    return data;
  }

  @Get('getChaldalDataFishMeat')
  async getChaldalDataFish() {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // try {
    //    await page.goto('https://chaldal.com/chicken-poultry');
      
    //     const items = await page.$$('[class^="product"]');
    
    //     const data = [];
    
    //       for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // await page.goto('https://chaldal.com/premium-perishables');
    // {
    //   const items = await page.$$('[class^="product"]');
    //   for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // }

    // {
    //   await page.goto('https://chaldal.com/frozen-fish');
    // {
    //   const items = await page.$$('[class^="product"]');
    //   for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // }
    // }

    // {
    //   await page.goto('https://chaldal.com/meat-new');
    // {
    //   const items = await page.$$('[class^="product"]');
    //   for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // }
    // }

    // {
    //   await page.goto('https://chaldal.com/tofu-meat-alternatives');
    // {
    //   const items = await page.$$('[class^="product"]');
    //   for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // }
    // }

    // {
    //   await page.goto('https://chaldal.com/dried-fish');
    // {
    //   const items = await page.$$('[class^="product"]');
    //   for (const item of items) {
    //     const name = await item.$eval('[class^="name"]', element => element.textContent);
    //     const quantity = await item.$eval('[class^="subText"]', element => element.textContent);
    //     const price = await item.$eval('[class^="price"]', element => element.textContent);

    //    const exists = data.some(product => (
    //     product.name === name &&
    //     product.quantity === quantity &&
    //     product.price === price
    //   ));

    //   // If the item doesn't exist, push it to the data array
    //   if (!exists) {
    //     data.push({
    //       name,
    //       quantity,
    //       price,
    //     });
    //   }
    // }
    // }
    // }

    

     
    //   return data;
    // } catch (error) {
    //   console.error(error);
    //   throw new Error('Internal Server Error');
    // }
    return await this.requestproservice.getChaldalDataFishMeat();
  }
  



  

 




}
    


