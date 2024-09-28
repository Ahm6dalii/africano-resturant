import { HttpException, Injectable, NotFoundException, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';
import { Model } from 'mongoose';
import { Cart } from 'src/core/schemas/cart.schema';
import { Delivery } from 'src/core/schemas/delivery.schema';
import { Food } from 'src/core/schemas/food.schema';
import { Product } from 'src/core/schemas/product.schema';
import { User } from 'src/core/schemas/user.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(User.name) private userModel: Model<User>
        , @InjectModel(Cart.name) private cartModel: Model<Cart>
        , @InjectModel(Product.name) private productModel: Model<Product>
        , @InjectModel(Food.name) private foodModel: Model<Food>
        , @InjectModel(Delivery.name) private deliveryModel: Model<Delivery>
        , private _jwtservice: JwtService) {
    }

    async getAllProduct() {
        // const myProduct= await this.cartModel.find().populate('items.items');
        const myProduct = await this.cartModel.find()
        return myProduct
    }

    async deleteProduct(param: string, size: string, token: string): Promise<Cart> {
        const decoded = this._jwtservice.verify(token, { secret: "mo2" });

        // Step 1: Find the user's cart
        const cart = await this.cartModel.findOne({ userId: decoded.userId });
        if (!cart) throw new NotFoundException('Cart not found');

        // Step 2: Find the product with the specified size in the cart and remove it
        const itemIndex = cart.items.findIndex(item =>
            item.items.toString() === param && item.size === size
        );

        if (itemIndex === -1) throw new NotFoundException('Product with specified size not found in cart');

        cart.items.splice(itemIndex, 1);  // Remove the item from the cart

        // Step 3: Recalculate the total price after removal
        cart.totalPrice = await this.calculateTotalPrice(cart);

        // Save and return the updated cart
        const mycart = await cart.save();
        return mycart
    }



    async removeAllCartItems(token): Promise<void> {
        const decoded = this._jwtservice.verify(token, { secret: "mo2" });

        const cart = await this.cartModel.findOne({ userId: decoded.userId });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.items = [];
        cart.totalPrice = 0;
        return await this.cartModel.findByIdAndUpdate(cart._id, { $set: { items: [], totalPrice: 0 } }, { new: true });
    }

    async updateQuantity(body, param: string, token: string): Promise<Cart> {
        const decoded = this._jwtservice.verify(token, { secret: "mo2" });
        const { size, quantity } = body;

        // Find the product to ensure it exists
        const product = await this.foodModel.findById(param);
        if (!product) {
            throw new NotFoundException(`Product with id ${param} not found`);
        }

        if (!product.amount[size]) {
            throw new NotFoundException(`Size ${size} not found for product ${param}`);
        }

        // Find the cart
        let cart = await this.cartModel.findOne({ userId: decoded.userId });
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item =>
            item.items.toString() === param && item.size === size
        );

        if (itemIndex > -1) {
            // Update the quantity of the existing item
            cart.items[itemIndex].quantity = quantity;
            cart.items[itemIndex].amount = product.amount[size]; // Update the amount to reflect the size-specific value
        } else {
            throw new NotFoundException('Item not found in cart');
        }

        // Update the total price of the cart
        cart.totalPrice = await this.calculateTotalPrice(cart);

        // Save and return the updated cart
        const mycart = await cart.save();
        return mycart
    }


    async addToCartt(param, size, itemNum, token): Promise<Cart> {
        console.log(itemNum);

        const decoded = this._jwtservice.verify(token, { secret: "mo2" });
        const addToCartDto = { productId: param, quantity: itemNum ? itemNum : 1 };
        const { productId, quantity } = addToCartDto;
        console.log(quantity, 'dfdfdfdfs');

        console.log(productId);
        console.log("get size now mo2  ", size);

        // Find the product to ensure it exists
        const product = await this.foodModel.findById(productId);
        console.log(product, 'dfdfsdfdfsfdsfsd');

        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }

        if (!product.amount[size]) {
            throw new NotFoundException(`Size ${size} not found for product ${productId}`);
        }

        // Extract only the size the user requested
        product.amount = product.amount[size]
        console.log(product, 'pro after modi');

        // Find the cart or create a new one if it doesn't exist
        let cart = await this.cartModel.findOne({ userId: decoded.userId });

        if (!cart) {
            cart = new this.cartModel({ userId: decoded.userId, items: [] });
        }

        // Check if the product with the requested size already exists in the cart
        const cartItemIndex = cart.items.findIndex(item =>
            item.items.toString() === productId && item.size === size
        );

        if (cartItemIndex > -1) {
            // If the product with the requested size is already in the cart, update the quantity
            cart.items[cartItemIndex].quantity += quantity;
        } else {
            const obj = JSON.parse(JSON.stringify(product));
            console.log({
                items: productId,
                size,  // Add size to the cart item
                ...obj,
                quantity,
            }, 'sdasdsdasds');

            cart.items.push({
                items: productId,
                size,  // Add size to the cart item
                ...obj,
                quantity,
            });
        }

        // Update the total price of the cart
        cart.totalPrice = await this.calculateTotalPrice(cart);

        // Save and return the updated cart
        const mycart = await cart.save();
        return mycart;
    }


    // Helper function to calculate total price
    private async calculateTotalPrice(cart: any) {
        let totalPrice = 0;
        for (const item of cart.items) {

            totalPrice += Math.ceil(item.amount * item.quantity);
        }
        return totalPrice;
    }


    async getUserCart(token) {
        const decoded = this._jwtservice.verify(token, { secret: "mo2" });

        const cart = await this.cartModel.findOne({ userId: decoded.userId });
        return cart
    }


}
