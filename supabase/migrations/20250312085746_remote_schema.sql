set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  if new.raw_user_meta_data->>'avatar_url' is null or new.raw_user_meta_data->>'avatar_url' = '' then
    new.raw_user_meta_data = jsonb_set(new.raw_user_meta_data, '{avatar_url}', '"https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"'::jsonb);
  end if;
  insert into public.users (id, email, avatar_url)
  values(new.id, new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;


