import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const getAuthSession = () => getServerSession(authOptions);
