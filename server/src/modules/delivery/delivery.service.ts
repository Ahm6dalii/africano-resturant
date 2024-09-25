import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Delivery } from 'src/core/schemas/delivery.schema';

@Injectable()
export class DeliveryService {

    constructor(@InjectModel(Delivery.name) private deliveryModel: Model<Delivery>) {
}


    async updateDeliveyPrice(body){
        const Delivery=await this.deliveryModel.updateOne({price:body.price})
        return{message:"price updated successFully" ,Delivery}
    }
    async getDeliveyPrice(){
        const Delivery=await this.deliveryModel.findOne()
        return Delivery
    }
}
