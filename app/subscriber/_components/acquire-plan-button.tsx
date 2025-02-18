"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckOut } from "../_actions/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();

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
  const userHasProPlan = user?.publicMetadata.subscriptionPlan === "pro";
  if (userHasProPlan) {
    return (
      <Button
        className="w-full rounded-3xl border border-primary text-primary"
        variant="link"
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      className="w-full rounded-3xl border border-primary text-primary"
      variant="ghost"
      onClick={handleAcquirePlan}
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
