import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(email,OTBCode:string,) {
    const message = ` <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1>Welcome to Africano Restaurant</h1>
        <p>Thank you for choosing us!</p>
        <h2 style="color: #e74c3c;">${OTBCode}</h2>
        <p>Please use this code within the next 15 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <footer style="font-size: 12px; color: #777;">
          <p>Africano Restaurant &copy; 2024</p>
        </footer>
      </div>
    `;

    await this.mailService.sendMail({
      from: '"Africano Resturant" <africanooresturant@gmail.com>',  
      to: `${email}`,            
      subject: `otb confirmation`,        
      html: message,                             
    });
  }
}
