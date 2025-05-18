import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './Users/Admin/admin.module';
import { DistributorModule } from './Users/Distributor/distributor.module';
import { IndustryModule } from './Users/Industry/industry.module';
import { UserModule } from './Users/User/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';


@Module({
    imports: [
        CacheModule.register({
                  ttl: 3600,
                  max: 100,
                  isGlobal: true
                }),
        AdminModule, DistributorModule, IndustryModule,UserModule, 
        TypeOrmModule.forRoot(
        { 
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'sajid',
            database: 'Vhoktar Odhikar',//Change to your database name
            autoLoadEntities: true,
            synchronize: true,
        } ),
        
    ],
    controllers: [],
    providers: [
        
    ],
})

export class AppModule {}