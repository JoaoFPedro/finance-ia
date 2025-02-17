"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckOut } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
  const handleAcquirePlan = async () => {
    const { sessionId } = await createStripeCheckOut();

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY) {
      throw new Error("Stripe key not found!");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY,
    );

    await stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <Button
      className="w-full rounded-3xl border border-primary text-primary"
      variant="ghost"
      onClick={handleAcquirePlan}
    >
      Adquirar plano Pro{" "}
    </Button>
  );
};

export default AcquirePlanButton;
