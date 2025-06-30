// src/payment/payment.controller.ts
import {
  Body,
  Controller,
  Post,
  Req,
  Headers,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateCheckoutDTO } from './dto/create-checkout.dto';
import { Request } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('checkout')
  async createCheckout(@Body() body: CreateCheckoutDTO) {
    return this.paymentService.createCheckoutSession(body.email);
  }

  @Post('webhook')
  async webhook(
    @Req() request: Request,
    @Headers('stripe-signature') sig: string,
  ) {
    const stripe = new (require('stripe'))(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    const rawBody = (request as any).rawBody;

    let event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    await this.paymentService.handleWebhook(event);
    return { received: true };
  }
}
