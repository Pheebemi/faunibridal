# Image Upload Setup Guide

Your image upload functionality is now ready! Here's how to complete the setup:

## 1. Set Up Supabase Storage

### Run the Storage Setup SQL:
1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `lib/supabase/storage-setup.sql`
4. Click **"Run"**

This will create:
- ✅ `dress-images` storage bucket
- ✅ Public read access policies
- ✅ Upload/update/delete policies

## 2. Test the Upload Functionality

### Try uploading an image:
1. **Start your dev server**: `npm run dev`
2. **Go to**: `http://localhost:3000/admin/dresses/new`
3. **Click "Choose Image File"**
4. **Select an image** from your computer
5. **Watch the upload progress**
6. **See the preview** appear automatically

## 3. Features Included

### ✅ File Upload:
- **Drag & drop** or click to select
- **File validation** (images only, max 5MB)
- **Progress indicator** with percentage
- **Unique filenames** to prevent conflicts
- **Automatic preview** after upload

### ✅ Fallback Options:
- **URL input** still available as backup
- **Image preview** for both uploads and URLs
- **Error handling** for invalid files/URLs

### ✅ User Experience:
- **Loading states** with spinner
- **File type validation** (JPG, PNG, GIF, WebP)
- **Size limits** (5MB max)
- **Clear button** to remove images
- **Responsive design**

## 4. How It Works

```
User selects file → Validates file → Uploads to Supabase Storage → Gets public URL → Updates form
```

### File Storage Structure:
```
dress-images/
├── dresses/
│   ├── 1703123456789-abc123.jpg
│   ├── 1703123456790-def456.png
│   └── ...
```

## 5. Supported File Types

- ✅ **JPG/JPEG** - Best for photos
- ✅ **PNG** - Best for graphics with transparency
- ✅ **GIF** - Animated images
- ✅ **WebP** - Modern format, smaller files
- ❌ **PDF, DOC, etc.** - Not supported

## 6. File Size Limits

- **Maximum**: 5MB per image
- **Recommended**: 1-2MB for web optimization
- **Automatic compression**: Handled by Supabase

## 7. Security Features

- **File type validation** - Only images allowed
- **Size limits** - Prevents large uploads
- **Unique filenames** - Prevents conflicts
- **Public read access** - Images are publicly accessible
- **Organized storage** - Files stored in `dresses/` folder

## 8. Troubleshooting

### Common Issues:

**"Upload failed"**
- Check your Supabase Storage setup
- Verify the storage bucket exists
- Check your environment variables

**"File too large"**
- Compress your image
- Use a smaller file size
- Try a different format

**"Invalid file type"**
- Use JPG, PNG, GIF, or WebP
- Check file extension
- Try renaming the file

### Getting Help:
- Check browser console for errors
- Verify Supabase Storage is set up
- Test with a small image first

## 9. Next Steps

Your image upload is now fully functional! You can:

1. **Upload images** for new collections and dresses
2. **Edit existing items** with new images
3. **Use URL fallback** when needed
4. **Manage your image library** through Supabase Storage

The images will be automatically optimized and served through Supabase's CDN for fast loading on your website!
