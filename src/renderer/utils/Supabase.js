// Supabase.js
// To access the supabase in other files use:
//
//  import supabase from '../Supabase.js';
//                or
//  import supabase from '../../Supabase.js';

import {createClient} from '@supabase/supabase-js';

const supabase = createClient(
  'https://szqedkllaitqpzsbbmcs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6cWVka2xsYWl0cXB6c2JibWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE1NDUwODYsImV4cCI6MTk3NzEyMTA4Nn0.1M2TsD1QrqN4Dnk5JauSkrpO408JcrU1dDJcniaIcPA'
)

export default supabase;
