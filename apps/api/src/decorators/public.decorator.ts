import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Opts a single route out of a controller-level @Protected().
 * Routes are already public unless @Protected() applies to them.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
