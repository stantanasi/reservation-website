'use client';

import { Service } from '@/types/service.type';
import { Staff } from '@/types/staff.type';
import { createContext, useContext, useState } from 'react';

export interface IBookingContext {
  activeStep: 'service' | 'practitioner' | 'slot' | 'checkout' | 'paiement';
  steps: IBookingContext['activeStep'][];

  booking: {
    service?: {
      service: Service;
    };
    practitioner?: {
      practitioner: 'any' | Staff;
    };
    slot?: {
      date?: Date;
      slot?: string;
    };
    checkout?: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      card: {
        number: string;
        name: string;
        expiry: string;
        cvc: string;
      };
      notes: string;
    };
  };
  setBooking: React.Dispatch<React.SetStateAction<IBookingContext['booking']>>;

  next: (currentStep?: IBookingContext['activeStep']) => void;
}

const BookingContext = createContext<IBookingContext | undefined>(undefined);
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};

export default function BookingProvider({
  initial = {},
  children,
}: React.PropsWithChildren<{
  initial?: IBookingContext['booking'];
}>) {
  const [activeStep, setActiveStep] = useState<IBookingContext['activeStep']>(initial.service?.service ? 'practitioner' : 'service');
  const [booking, setBooking] = useState<IBookingContext['booking']>(initial);

  const steps: IBookingContext['steps'] = ['service', 'practitioner', 'slot', 'checkout', 'paiement'];

  const next = (currentStep?: IBookingContext['activeStep']) => {
    const nextStep = steps[steps.indexOf(currentStep ?? activeStep) + 1];

    setActiveStep(nextStep);
    setTimeout(() => {
      if (nextStep === 'paiement') {
        document.getElementById('booking')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      } else {
        document.getElementById(`booking-step-${nextStep}`)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }
    }, 80);
  };

  return (
    <BookingContext.Provider
      value={{
        activeStep: activeStep,
        steps: steps,
        booking: booking,
        setBooking: setBooking,
        next: next,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
