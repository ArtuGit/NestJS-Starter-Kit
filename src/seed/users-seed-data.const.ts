export const USERS_SEED_DATA = [
  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('d290f1ee-6c54-4b01-90e6-d701748f0851', now(), now(), 'Alice Smith', 'alice_smith', 'alice@example.com', true, 'hashed_password_1', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('a5b89f1d-0a6f-4eae-a8b8-4bbd0074f29f', now(), now(), 'Bob Johnson', 'bobby_j', 'bob@example.com', false, 'hashed_password_2', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('e74d6c5a-1c25-4f6b-9c18-6f9e4b5d123e', now(), now(), 'Charlie Brown', 'charlie_b', 'charlie@example.com', true, 'hashed_password_3', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('c9bf4ed3-5dcd-4a5a-9c23-6106db6d441d', now(), now(), 'Dana White', 'dana_white', 'dana@example.com', true, 'hashed_password_4', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('b5e4d2a2-3d0e-483b-8b7c-3a23f0d34d4f', now(), now(), 'Eve Black', 'eve_black', 'eve@example.com', false, 'hashed_password_5', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('fa99d6e4-6c21-4d6e-bf5d-1b908d741b45', now(), now(), 'Frank Green', 'frank_green', 'frank@example.com', true, 'hashed_password_6', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('a56a44e5-ec3d-4fb5-8361-4c8a9d7a1b44', now(), now(), 'Grace Hall', 'grace_hall', 'grace@example.com', true, 'hashed_password_7', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('b6a1b349-78b1-4d94-b5ff-7db0ae99d8f4', now(), now(), 'Hank Miller', 'hank_miller', 'hank@example.com', false, 'hashed_password_8', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('e67d1a65-4d5b-4f0a-a9e4-dabc678f53f3', now(), now(), 'Ivy Nelson', 'ivy_nelson', 'ivy@example.com', false, 'hashed_password_9', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,

  `INSERT INTO public.users (id, "createdAt", "updatedAt", "fullName", "userName", email, "isEmailConfirmed", password, role) VALUES
      ('d89072b9-5c7e-4d25-9308-7af5e6d9f255', now(), now(), 'Jackie O', 'jackie_o', 'jackie@example.com', true, 'hashed_password_10', 'Regular User')
      ON CONFLICT (id) DO NOTHING;`,
]
