import { Container, Scope } from 'typescript-ioc';

import { ILog } from '../Logs/ILog';
import { IBetService } from '../Services/DataBase/Interfaces/IBetService';
import { ICategoryService } from '../Services/DataBase/Interfaces/ICategoryService';
import { IAnswerService } from '../Services/DataBase/Interfaces/IAnswerService';
import { IUserService } from '../Services/DataBase/Interfaces/IUserService';
import { IDataBaseService } from '../Services/DataBase/Interfaces/IDataBaseService';
import { IAuthService } from '../Services/DataBase/Interfaces/IAuthService';
import { IMailerService } from '../Services/DataBase/Interfaces/IMailerService';
import { IRewardTiersService } from '../Services/DataBase/Interfaces/IRewardTiersService';
import { IImageUploaderService } from '../Services/DataBase/Interfaces/IImageUploaderService';
import { IServiceClientService } from '../Services/DataBase/Interfaces/IServiceClientService';

import { ServerLog } from '../Logs/ServerLog';
import { BetService } from '../Services/DataBase/BetService';
import { CategoryService } from '../Services/DataBase/CategoryService';
import { AnswerService } from '../Services/DataBase/AnswerService';
import { UserService } from '../Services/DataBase/UserService';
import { DataBaseService } from '../Services/DataBase/DataBaseService';
import { AuthService } from '../Services/DataBase/AuthService';
import { MailerService } from '../Services/DataBase/MailerService';
import { RewardTiersService } from '../Services/DataBase/RewardTiersService';
import { ImageUploaderService } from '../Services/DataBase/ImageUploaderService';
import { ServiceClientService } from '../Services/DataBase/ServiceClientService';

export class IoCConfiguration {
    public static configure(){ 
      Container.bind(ILog).to(ServerLog).scope(Scope.Singleton);
      Container.bind(IMailerService).to(MailerService).scope(Scope.Singleton);
      Container.bind(IAuthService).to(AuthService).scope(Scope.Singleton);
      Container.bind(IDataBaseService).to(DataBaseService).scope(Scope.Singleton);
      Container.bind(IBetService).to(BetService).scope(Scope.Singleton); 
      Container.bind(ICategoryService).to(CategoryService).scope(Scope.Singleton); 
      Container.bind(IAnswerService).to(AnswerService).scope(Scope.Singleton); 
      Container.bind(IUserService).to(UserService).scope(Scope.Singleton);
      Container.bind(IRewardTiersService).to(RewardTiersService).scope(Scope.Singleton);
      Container.bind(IImageUploaderService).to(ImageUploaderService).scope(Scope.Singleton);
      Container.bind(IServiceClientService).to(ServiceClientService).scope(Scope.Singleton);
    }
}
