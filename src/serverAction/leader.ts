// src/actions/createLeader.ts

'use server';
import { Response } from '@/types/response';
import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { createLead as createLeadSchema } from '@/types/leader'; // Ganti nama import agar tidak konflik
import { or, eq } from 'drizzle-orm'; // <-- Import 'or' dan 'eq'
import { db } from '@/libs/db';
import { Lead } from '../../db/schema';

type LeadInput = z.infer<ReturnType<typeof createLeadSchema>>;

export const createLeader = async (
  lead: LeadInput,
  locale: 'id' | 'en',
): Promise<Response> => {
  const t = await getTranslations({ locale, namespace: 'contactForm' });
  const s = await getTranslations({ locale, namespace: 'serverAction' });

  const parsedLead = createLeadSchema(t).safeParse(lead);

  if (!parsedLead.success) {
    return {
      status: 'error',
      message: parsedLead.error.issues.map((err) => err.message),
    };
  }

  const { name, noWhatapps } = parsedLead.data;

  try {
    const existingLead = await db.query.Lead.findFirst({
      where: or(eq(Lead.name, name), eq(Lead.noWhatapps, noWhatapps)),
    });

    if (existingLead) {
      const errorMessages: string[] = [];

      if (existingLead.name === name) {
        errorMessages.push(
          s('error.duplicate', {
            field: locale === 'id' ? 'nama' : 'name',
            value: name,
          }),
        );
      }

      if (existingLead.noWhatapps === noWhatapps) {
        errorMessages.push(
          s('error.duplicate', {
            field: locale === 'id' ? 'Nomor Whatapps' : 'Number Whatapps',
            value: noWhatapps,
          }),
        );
      }

      if (errorMessages.length > 0) {
        return {
          status: 'error',
          message: errorMessages,
        };
      }
    }

    const result = await db.insert(Lead).values(parsedLead.data).returning();

    return {
      status: 'success',
      message: `${s('success.create', { subject: 'Lead' })}`,
      data: result,
    };
  } catch (error) {
    console.error('Error creating lead:', error);
    return {
      status: 'error',
      message: [s('error.generic')],
    };
  }
};
