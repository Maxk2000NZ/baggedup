import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avhyokkfzlsebqutbvvg.supabase.co';
const supabaseKey = 'sb_publishable_KFp9uveyM0g0kHR3zuxCxA_OfpYx6A3';

export const supabase = createClient(supabaseUrl, supabaseKey);