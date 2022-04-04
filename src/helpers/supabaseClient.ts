import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://psozqdptfoileqltxiuz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzb3pxZHB0Zm9pbGVxbHR4aXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDgzODQxNTksImV4cCI6MTk2Mzk2MDE1OX0.TfbKNyDQJRG1KLio24SeF7zneCEK-1IEKkRUj-NaVj0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
