import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    // We throw a descriptive error here so it's clear why the application might crash during module evaluation
    throw new Error(
        'Missing Supabase Admin environment variables. ' +
        'Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file.'
    )
}

// This client bypasses RLS and should ONLY be used in Server Actions / API Routes
// NEVER expose this to the browser (NEXT_PUBLIC_)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
