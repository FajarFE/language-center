import { useTranslations } from 'next-intl';
import * as z from 'zod';

const nameRegex = /^[a-zA-Z\u00C0-\u017F\s'-]+$/;
const phoneRegex = /^\+?[1-9]\d{7,14}$/;

export const createLead = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    name: z
      .string()
      .nonempty({ message: t('validator.name.required') })
      .min(2, { message: t('validator.name.minString') })
      .max(255, { message: t('validator.name.maxString') })
      .regex(nameRegex, {
        message: t('validator.name.invalid'),
      }),
    noWhatapps: z
      .string()
      .nonempty({ message: t('validator.noWhatapps.required') })
      .regex(phoneRegex, {
        message: t('validator.noWhatapps.invalid'),
      }),
  });

type LeadSchemaType = ReturnType<typeof createLead>;
export type Lead = z.infer<LeadSchemaType>;
