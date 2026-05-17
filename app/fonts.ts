import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

export const cormorant_garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});
