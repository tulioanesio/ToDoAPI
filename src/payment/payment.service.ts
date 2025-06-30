// src/payment/payment.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-05-28.basil',
  });

  constructor(private prismaService: PrismaService) {}

  async createCheckoutSession(email: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Premium',
            },
            unit_amount: 900,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    return { url: session.url };
  }

  async handleWebhook(event: Stripe.Event) {
    console.log(`Received event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email;

      console.log(`Session completed for email: ${email}`);

      if (!email) {
        console.warn('No email found in session');
        return;
      }

      try {
        await this.prismaService.user.update({
          where: { email },
          data: { isPremium: true },
        });
        console.log(`User ${email} upgraded to premium`);
      } catch (error) {
        console.error(`Failed to upgrade user: ${error.message}`);
      }
    }
  }
}
