
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ypyoynqvmjdpvmqlehfv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlweW95bnF2bWpkcHZtcWxlaGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzMyNjgsImV4cCI6MjA1NjgwOTI2OH0.tfVYwX0Ag-FqN7eRtCVb9QyJUSCvgv2GyMLbHIZguG4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
