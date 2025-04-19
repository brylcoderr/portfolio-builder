import { loadStripe } from '@stripe/stripe-js';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User, SubscriptionPlan } from '../types';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const createCheckoutSession = async (userId: string, priceId: string): Promise<string> => {
  try {
    // Call your backend endpoint to create a Checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        priceId,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId: data.sessionId,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data.sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

export const createPortalSession = async (userId: string): Promise<string> => {
  try {
    // Call your backend endpoint to create a Customer Portal session
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return data.url;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

export const getUserSubscription = async (userId: string): Promise<SubscriptionPlan | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return null;
    }
    
    const userData = userDoc.data() as User;
    return userData.subscription || null;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    return null;
  }
};

export const updateUserSubscription = async (
  userId: string, 
  subscription: SubscriptionPlan
): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      subscription,
    });
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (userId: string): Promise<void> => {
  try {
    // Call your backend endpoint to cancel the subscription
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    // Update the user's subscription status in Firestore
    await updateDoc(doc(db, 'users', userId), {
      'subscription.status': 'canceled',
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};