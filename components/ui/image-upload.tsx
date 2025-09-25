'use client'

import { useState, useRef } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Upload, X, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  placeholder?: string
  className?: string
}

export function ImageUpload({ value, onChange, placeholder = "Enter image URL", className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    const supabase = createClient()
    
    const { data, error } = await supabase.storage
      .from('dress-images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    const { data: { publicUrl } } = supabase.storage
      .from('dress-images')
      .getPublicUrl(data.path)

    return publicUrl
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF, etc.)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    
    try {
      // Generate unique filename
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop()
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`
      const filePath = `dresses/${fileName}`
      
      const uploadedUrl = await uploadImage(file, filePath)
      if (uploadedUrl) {
        onChange(uploadedUrl)
        setUploadProgress(100)
      } else {
        alert('Failed to upload image. Please try again.')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const clearImage = () => {
    onChange('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Upload Image
        </label>
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Choose Image File
              </>
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* URL Input (Alternative) */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Or Enter Image URL
        </label>
        <div className="flex gap-2">
          <Input
            type="url"
            value={value || ''}
            onChange={handleUrlChange}
            placeholder={placeholder}
            className="flex-1"
          />
          {value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearImage}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Image Preview */}
      {value && (
        <div className="relative">
          <label className="block text-sm font-medium mb-2">
            Preview
          </label>
          <div className="relative w-full h-48 border rounded-lg overflow-hidden">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="flex items-center justify-center h-full text-muted-foreground">
                      <div class="text-center">
                        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p>Invalid image URL</p>
                      </div>
                    </div>
                  `
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
