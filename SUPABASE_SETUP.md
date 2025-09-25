# Supabase CMS Setup Guide

This guide will help you set up Supabase as your CMS for the FAUNi Bridals website.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `faunibridal-cms`
   - Database Password: (choose a strong password)
   - Region: Choose closest to your users
5. Click "Create new project"

## 2. Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `lib/supabase/migrations.sql`
3. Click "Run" to execute the SQL

This will create:
- `collections` table with sample data
- `dresses` table with sample data
- Proper relationships and indexes
- Row Level Security policies

## 3. Configure Environment Variables

1. In your Supabase dashboard, go to Settings > API
2. Copy your project URL and anon key
3. Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. Set Up Storage (Optional)

For image uploads, you'll need to set up Supabase Storage:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `dress-images`
3. Set it to public
4. Configure policies for public read access

## 5. Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/admin/collections` to see the admin interface
3. Try adding a new collection or dress
4. Check that the frontend pages display data from Supabase

## Features Included

### Admin Interface
- **Collections Management**: View, add, edit, delete collections
- **Dresses Management**: View, add, edit, delete dresses
- **Real-time Updates**: Changes reflect immediately
- **Image Support**: URL-based image uploads (file upload coming soon)

### Frontend Integration
- **Dynamic Collections**: Collections page pulls from Supabase
- **Dynamic Dresses**: Dresses page with filtering and pagination
- **Individual Pages**: Collection and dress detail pages
- **SEO Optimized**: Server-side rendering with proper metadata

### Database Schema
- **Collections**: id, title, description, image, timestamps
- **Dresses**: id, name, description, price, image, collection_id, timestamps
- **Relationships**: Proper foreign key constraints
- **Security**: Row Level Security enabled

## Next Steps

1. **Authentication**: Add user authentication for admin access
2. **File Uploads**: Implement actual image file uploads
3. **Advanced Features**: Add categories, tags, inventory management
4. **Performance**: Add caching and optimization
5. **Backup**: Set up automated backups

## Troubleshooting

### Common Issues

1. **Environment Variables**: Make sure `.env.local` is properly configured
2. **Database Connection**: Check that your Supabase URL and keys are correct
3. **CORS Issues**: Ensure your domain is allowed in Supabase settings
4. **RLS Policies**: Check that Row Level Security policies are properly configured

### Getting Help

- Check the Supabase documentation
- Review the console for error messages
- Ensure all dependencies are installed: `npm install`

## Security Notes

- The current setup allows public read access to collections and dresses
- Admin operations are currently unrestricted (for development)
- In production, implement proper authentication and authorization
- Consider implementing rate limiting and input validation
