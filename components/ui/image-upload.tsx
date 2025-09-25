'use client'

import { useState, useRef } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  placeholder?: string
  className?: string
}

export function ImageUpload({ value, onChange, placeholder = "Enter image URL", className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // For now, we'll just show a message that file upload is not implemented
    // In the future, this would upload to Supabase Storage
    alert('File upload is not yet implemented. Please use an image URL for now.')
    
    // TODO: Implement actual file upload to Supabase Storage
    // setIsUploading(true)
    // try {
    //   const uploadedUrl = await uploadImage(file, `dresses/${Date.now()}-${file.name}`)
    //   if (uploadedUrl) {
    //     onChange(uploadedUrl)
    //   }
    // } catch (error) {
    //   console.error('Error uploading image:', error)
    // } finally {
    //   setIsUploading(false)
    // }
  }

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const clearImage = () => {
    onChange('')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Image URL
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

      {/* File Upload (Future Feature) */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Or Upload File (Coming Soon)
        </label>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Choose File'}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
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
                        <ImageIcon class="w-8 h-8 mx-auto mb-2" />
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
