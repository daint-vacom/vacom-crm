import z from 'zod';
import { SCHEMA_MESSAGES } from '../messages/schema-messages';

export interface StringSchemaOptions {
  required?: boolean;
  message?: string;
  minLength?: number;
  maxLength?: number;
  minLengthMessage?: (min: number) => string;
  maxLengthMessage?: (max: number) => string;
  constraints?: StringSchemaConstraints[];
}

export const stringSchema = ({
  required = true,
  message = SCHEMA_MESSAGES.REQUIRED,
  minLength,
  maxLength,
  minLengthMessage = SCHEMA_MESSAGES.MIN_LENGTH,
  maxLengthMessage = SCHEMA_MESSAGES.MAX_LENGTH,
  constraints,
}: StringSchemaOptions = {}) => {
  let schema: z.ZodTypeAny = z.string({
    message,
  });

  // length limits
  if (minLength)
    schema = (schema as unknown as z.ZodString).min(minLength, {
      message: minLengthMessage(minLength),
    });
  if (maxLength)
    schema = (schema as unknown as z.ZodString).max(maxLength, {
      message: maxLengthMessage(maxLength),
    });

  // apply constraints (composed as refinements / built-ins)
  if (constraints && Array.isArray(constraints)) {
    for (const c of constraints) {
      switch (c.type) {
        case 'email':
          schema = (schema as unknown as z.ZodString).email({
            message: c.message ?? 'Email không hợp lệ',
          });
          break;
        case 'phone': {
          const phonePattern = c.pattern
            ? new RegExp(c.pattern)
            : /^[+()0-9\s-]+$/;
          schema = (schema as unknown as z.ZodString).refine(
            (s: string) => phonePattern.test(s),
            {
              message: c.message ?? 'Số điện thoại không hợp lệ',
            },
          );
          break;
        }
        case 'noLetters':
          schema = (schema as unknown as z.ZodString).refine(
            (s: string) => !/[A-Za-z]/.test(s),
            {
              message: c.message ?? 'Không được chứa chữ cái',
            },
          );
          break;
        case 'noDigits':
          schema = (schema as unknown as z.ZodString).refine(
            (s: string) => !/\d/.test(s),
            {
              message: c.message ?? 'Không được chứa chữ số',
            },
          );
          break;
        case 'pattern': {
          try {
            const re = new RegExp(c.pattern);
            schema = (schema as unknown as z.ZodString).refine(
              (s: string) => re.test(s),
              {
                message: c.message ?? 'Giá trị không khớp mẫu',
              },
            );
          } catch {
            // invalid pattern: ignore the constraint (could log in future)
          }
          break;
        }
        default:
          // unknown constraint: ignore for now
          break;
      }
    }
  }

  // nullish when not required or explicitly allowed
  if (!required || minLength === 0) {
    schema = schema.nullish();
  }

  return schema;
};

export type StringSchemaConstraints =
  | { type: 'email'; message?: string }
  | { type: 'phone'; message?: string; pattern?: string }
  | { type: 'noLetters'; message?: string }
  | { type: 'noDigits'; message?: string }
  | { type: 'pattern'; pattern: string; message?: string };
