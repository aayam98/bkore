import { SingleItemCartProps } from '@components/ui/bodykore/Cart/SingleCartItem';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

interface ProductProps {
  name: string;
  productId: string;
}

// Using atomWithStorage for persistence and better HMR support
export const menuSidebarOpenState = atomWithStorage('menuSidebarOpen', false);

export const cartSidebarOpenState = atomWithStorage('cartSidebarOpen', false);

export const searchOpenState = atomWithStorage('searchOpen', false);

export const cartItemsState = atomWithStorage<SingleItemCartProps[]>('cartItems', []);

export const checkoutUrlState = atomWithStorage<string | undefined>('checkoutUrl', undefined);

export const cartTotalState = atomWithStorage<string | undefined>('cartTotal', undefined);

export const cartAddOn = atomWithStorage<ProductProps[] | undefined>('cartAddOn', []);

export const canCheckoutState = atomWithStorage('canCheckout', true);

export type Toast = {
  id: number;
  title: string;
  message: string;
  duration?: number;
};

export const toastAtom = atomWithStorage<Toast[]>('toastAtom', []);

// If you need derived state that shouldn't be persisted, use regular atoms
// Example:
// export const derivedState = atom((get) => {
//   const cartItems = get(cartItemsState);
//   return cartItems.length > 0;
// });