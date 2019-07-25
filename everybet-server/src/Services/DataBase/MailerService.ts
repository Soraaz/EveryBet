import { Provides, Inject } from "typescript-ioc";
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

import { IMailerService } from "./Interfaces/IMailerService";
import { ServerError } from '../../Errors/ServerError';
import { UserDto } from "../../Dtos/UserDto";
import * as Config from '../../../config.json';
import { IUserService } from "./Interfaces/IUserService";

@Provides (IMailerService)
export class MailerService implements IMailerService {
    @Inject
    private userService: IUserService;

    // Sends register by e-mail to every user matching with filter
    async sendRegister(filter: Map<string, object>): Promise<void> {
        const users = await this.userService.getUsers(filter) as UserDto[];

        users.forEach(user => {
            if (!user.email){
                throw new ServerError(400, "Bad request: Impossible to send a mail to a user who doesn't have an e-mail");
            }
            const transporter = nodemailer.createTransport({
                service: Config.mail.service,
                auth: {
                    user: Config.mail.user,
                    pass: Config.mail.pass
                }
            }); 
            const mailOptions = {
                from: Config.mail.from,
                to: user.email,
                subject: 'Welcome to EveryBet!',
                text: fs.readFileSync(path.normalize(`${__dirname}/../../../templates/emails/registration.txt`), {encoding:'utf-8'}).toString().replace('{name}', user.login),
                html: fs.readFileSync(path.normalize(`${__dirname}/../../../templates/emails/registration.html`), {encoding:'utf-8'}).toString().replace('{name}', user.login)
            };
            transporter.sendMail(mailOptions);
        });
    }
}