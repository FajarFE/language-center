import { db } from '@/libs/db';

import { Response } from '@/types/response';
import { z } from 'zod';
import { Lead } from '../../db/schema';
import { getTranslations } from 'next-intl/server';
import { getLeadSchema } from '@/types/leader';

type LeadInput = z.infer<typeof getLeadSchema>;

export const createLeader = async (
  lead: LeadInput,
  locale: 'id' | 'en',
): Promise<Response> => {
  const t = await getTranslations({
    locale,
    namespace: 'contactForm',
  });
  const parsedLead = getLeadSchema(t).safeParse(lead);

  if (!parsedLead.success) {
    return {
      status: 'error',
      message: parsedLead.error.issues.map((err) => err.message),
    };
  }

  try {
    const result = await db.insert(Lead).values(parsedLead.data).returning();
    return {
      status: 'success',
      message: 'Lead created successfully',
      data: result,
    };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};
