
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email TEXT;


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


UPDATE public.profiles
SET email = u.email
FROM auth.users u
WHERE public.profiles.id = u.id AND public.profiles.email IS NULL;



UPDATE public.profiles 
SET is_admin = TRUE 
WHERE email = 'CHECK_YOUR_EMAIL_HERE';
